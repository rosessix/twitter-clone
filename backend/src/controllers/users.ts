import { Request, Response } from "express"
import { RowDataPacket } from "mysql2";
import { v4 as generateUid } from 'uuid'
import db from '../util/db';
import bcrypt from 'bcrypt';
import { User } from "../models/user";

const SALT_ROUNDS = 12
const DEFAULT_IMAGE = 'https://picsum.photos/200' // this is a random image

type CreateUserResult =
  | { error: true; msg: string }
  | { error: false; msg: string; user: Promise<{ error: boolean; msg?: string; user?: any }> };
export const createUser = async (email: string, username: string, password: string, req: Request): Promise<CreateUserResult> => {
    let con = await db.getConnection();

    let data: any = await con.execute('SELECT * FROM users WHERE email = ? OR username = ?', [email, username])
    con.release()

    if (data[0][0] == undefined) { // no user found
        let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        let gUid = await generateUid();

        let query = 'INSERT INTO users (id, email, username, password, img) VALUES (?, ?, ?, ?, ?)'
        let values = [gUid, email, username, hashedPassword, DEFAULT_IMAGE]
        let creation = await con.execute(query, values)
        let user = loginUser(email, password, req)

        return { error: false, msg: "Your account has been created.", user: user }
    } else { // already a user with either username or email
        if (data[0][0].email === email) {
            return { error: true, msg: "This email is already in use." }
        }

        con.release()
        if (data[0][0].username === username) {
            return { error: true, msg: "There is already a user with this username." }
        }
    }

    return {error: true, msg: 'Unknown error occured.'}
}

export const loginUser = async (email: string, password: string, req: Request) => {
    let con = await db.getConnection();
    const NO_USER_MSG = 'The credentials given, did not match a user.'
    let query = 'SELECT * FROM users WHERE email = ?'
    let values = [email]

    let data: any = await con.execute(query, values)
    con.release()

    // let user: User = data[0][0]
    let user = data[0][0]
    if (user == undefined) {
        return { error: true, msg: NO_USER_MSG }
    }

    
    if (!user || !user.password) {
        return { error: true, msg: NO_USER_MSG };
    }

    const MATCH = await bcrypt.compare(password, user.password)

    if (!MATCH) {
        return { error: true, msg: NO_USER_MSG };
    }

    user.password = undefined; // remove it for security reasons
    user.avatar = user.avatar || DEFAULT_IMAGE;

    // (req.session as any).user = {
    //     user
    // }
    return { error: false, user: user }
}

export const getUserFromId = async (id: String) => {
    if (!id) throw new Error('getUserFromId must have a valid id parsed.')
    let con = await db.getConnection();

    let data: any = await con.execute('SELECT * FROM users WHERE id = ?', [id])
    con.release()
    let user = data[0][0]

    user.password = undefined
    if (!user) return console.log(`Could not find user ${id} in the database.`)

    return user
}

export const fetchAllUsers = async () => {
    let con = await db.getConnection()
    let data = await con.execute('SELECT * FROM users')
    con.release()
    let users = data[0]
    return users
}

export const updateUserProfile = async (id: string, bio: string, location: string, link: string) => {
    let con = await db.getConnection();

    let query = 'UPDATE users SET bio = ?, location = ?, link = ? WHERE id = ?'
    let values = [bio, location, link, id]
    let edited = await con.execute(query, values)
    con.release()

    let userData = await getUserFromId(id)
    console.log(userData)
    return userData
}

