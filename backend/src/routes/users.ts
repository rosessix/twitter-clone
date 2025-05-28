import express, { Router, Request, Response } from "express";
import { createUser, loginUser } from "../controllers/users";
import db from '../util/db';
import jwt from 'jsonwebtoken';
import { assignToken } from "../util/tokenHandler";
const router: Router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    let { email, password, username } = req.body;

    let created = await createUser(email, username, password, req)
    res.status(200).send(created)
})

router.get('/:id', (req: Request, res: Response) => {
    console.log('hej det er fra id')
})

router.post('/login', async (req: Request, res: Response) => {
    let { email, password } = req.body

    let { errorMsg, user } = await loginUser(email, password, req)

    let token = undefined
    if (!errorMsg) {
        token = assignToken(user, { expiresIn: '1h' })
    }

    // res.status(200).send(login)
    console.log('login')
    res.status(200).send({ token: token, errorMsg: errorMsg })
})

export default router;