import { User } from "../models/user";
import db from "../util/db";
import { getUserFromId } from "./users";
import { v4 as generateUid } from 'uuid'
import jwt from 'jsonwebtoken'
import { RowDataPacket } from "mysql2";

export const createPost = async (authorId: String, text: String) => {
    if (!authorId) throw new Error('createPost authorId must be a valid string.')
    if (!text) throw new Error('createPost text, must have a valid text form, and has to be a string.')

    let con = await db.getConnection();
    let randomId = generateUid();
    let postId = `${authorId}-${randomId}`
    let data = await con.execute('INSERT INTO posts (id, authorId, text) VALUES (?, ? ,?)', [postId, authorId, text])
    con.release()
    if (!data) return { error: true, errorMsg: 'An error occured. Please try again.' }
    return data
}

export const getPostFromId = async (postId: string) => {
    const NO_POST_FOUND = `The given postId (${postId}) did not return a post from the database. Please contact a developer if this issue persists.`
    let con = await db.getConnection();
    let data: any = await con.execute('SELECT * FROM posts WHERE id = ?', [postId])
    let post = data[0][0]

    if (!post) return console.log(NO_POST_FOUND)

    let likeData: any = await con.execute('SELECT COUNT(*) as likeCount FROM post_likes WHERE post_id = ?', [postId])
    let likeCount = likeData[0][0].likeCount;
    post.likeCount = likeCount
    con.release()
    return post
}

export const fetchPost = async (authorId: String, postId: string) => {
    const NO_USER_FOUND = `Could not find any user with given authorId (${authorId})`
    const NO_POST_FOUND = `The given postId (${postId}) did not give a post back from the database. Please contact a developer if this issue persists.`

    if (!authorId) throw new Error('fetchPost authorId must be a valid string.')
    let user = await getUserFromId(authorId)
    if (!user) return { error: true, erorrMsg: NO_USER_FOUND }

    let post = await getPostFromId(postId)
    if (!post) return { error: true, NO_POST_FOUND }

    return post
}

export const fetchAllPosts = async () => {
    let con = await db.getConnection();
    let data = await con.execute(`
        SELECT 
            posts.id AS post_id,  -- Alias the post's id
            posts.authorId, 
            posts.text, 
            users.id AS user_id,  -- Alias the user's id
            users.username, 
            users.email,
            users.img,
            posts.created_at,
            COUNT(post_likes.post_id) AS likeCount
        FROM posts
        INNER JOIN users ON posts.authorId = users.id
        LEFT JOIN post_likes ON posts.id = post_likes.post_id
        GROUP BY posts.id, users.id
        ORDER BY posts.created_at DESC
    `);
    let posts = data[0]
    con.release()

    return posts
}

export const likePostWithId = async (user: User, postId: string) => {
    let con = await db.getConnection()
    let [rows] = await con.execute<RowDataPacket[]>(
        `SELECT * FROM post_likes WHERE user_id = ? AND post_id = ?`,
        [user.id, postId]
    )

    if (rows.length == 0) {
        let inserted = await con.execute(
            `INSERT INTO post_likes (post_id, user_id) VALUES(?, ?)`,
            [postId, user.id]
        )
        con.release()
        return {liked: true}
    } else {
        let deleted = await con.execute(
            `DELETE FROM post_likes WHERE post_id = ? AND user_id = ?`,
            [postId, user.id]
        )
        con.release()
        return {liked: false}
    }
}