import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const JWT_KEY = 'omega_secret_key_lol_kekw'

declare module 'express-serve-static-core' {
    interface Request {
        user?: any; // You can replace 'any' with a specific type for the user if known
    }
}

export const assignToken = (user: any, data: any) => {
    return jwt.sign(user, JWT_KEY, data)
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    if (authHeader == undefined) {
        return res.status(401).send({error: true, errorMsg: 'No token found. Please login.'}) // no token found
    }
    
    const token = authHeader.split(' ')[1]; // Assuming Bearer token format
    
    jwt.verify(token, JWT_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({error: true, errorMsg: 'Invalid token. Please login, again.'}); // Invalid token
        }
    
        req.user = user; // Add user to the request object
        next(); // Proceed to the next middleware or route
    });
}