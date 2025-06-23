import express, { Router, Request, Response } from "express";
import { createUser, loginUser, updateUserProfile } from "../controllers/users";
import db from '../util/db';
import jwt from 'jsonwebtoken';
import { assignToken, authenticateToken } from "../util/tokenHandler";
const router: Router = express.Router();

router.post('/create', async (req: Request, res: Response) => {
    let { email, password, username } = req.body;

    let creation = await createUser(email, username, password, req)

    if (creation.error) {
        return res.status(200).send({ error: true, msg:  creation.msg})
    }

    let login = await loginUser(email, password, req)

    let token = undefined
    if (!login.error) {
        token = assignToken(login.user, { expiresIn: '1h' })
    }
    console.log(login.msg)
    res.status(200).send({ token: token, msg: login.msg })

})

router.get('/:id', (req: Request, res: Response) => {
    console.log('hej det er fra id')
})

router.post('/login', async (req: Request, res: Response) => {
    let { email, password } = req.body

    let login = await loginUser(email, password, req)

    let token = undefined
    if (!login.error) {
        token = assignToken(login.user, { expiresIn: '1h' })
    }

    // res.status(200).send(login)
    console.log('login')
    res.status(200).send({ token: token, msg: login.msg})
})

router.post('/update', authenticateToken, async (req: Request, res: Response) => {
    let {bio, location, link} = req.body

    let user = await updateUserProfile(req.user.id, bio, location, link)
    res.status(200).send({updated: true, userData: user})

})

export default router;