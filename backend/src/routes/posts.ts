import express, { Router, Request, Response } from "express";
import db from "../util/db";
import { createPost, fetchAllPosts, likePostWithId } from "../controllers/posts";
import { fetchAllUsers } from "../controllers/users";
import { RowDataPacket } from "mysql2";
import { authenticateToken } from "../util/tokenHandler";
const router: Router = express.Router();

router.post('/create', authenticateToken, async (req: Request, res: Response) => {
    let { authorId, text } = req.body
    if (!text || text.length === 0) return { error: true, errorMsg: 'You have to input some text before you make a post.' }

    let post = createPost(authorId, text)
    res.status(200).send({ message: 'Post created!' })
    console.log('send!')
})

router.post('/:id/like', authenticateToken, async (req: Request, res: Response) => {
    let params = req.params
    let postId = params.id
    let bearer = req.headers.authorization
    if (!bearer || !req.user) {
        return res.status(200).send({error: true, errorMsg: 'An internal error has occured. Try logging in again.'})
    }

    let liked = await likePostWithId(req.user, postId)
    res.status(200).send(liked)
})

router.get('/all', async (req: Request, res: Response) => {
    let posts = await fetchAllPosts()
    res.status(200).send(posts)
})

router.get('/', async (req: Request, res: Response) => {
    let posts = await fetchAllPosts()
    res.status(200).send(posts)
})

export default router;