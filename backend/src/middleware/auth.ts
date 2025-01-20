import type { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken";
import User, { IUser } from '../models/User';


// to declare user on req variable
declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = (req.headers.authorization);
    console.log(console.log(bearer));

    if (!bearer) {
        const error = new Error('Not authorized');
        res.status(401).json({ error: error.message })
        return;
    }

    const [, token] = bearer.split(' ');
    console.log(token);

    if (!token) {
        const error = new Error('Not authorized');
        res.status(401).json({ error: error.message })
        return;
    }

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof result == 'object' && result.id) {
            // console.log(result.id);
            const user = await User.findById(result.id).select('-password');

            if (!user) {
                const error = new Error('The user does not exist');
                res.status(404).json({ error: error.message });
                return;
            }
            req.user = user;
            next();
        }
        console.log(result);
    } catch (error) {
        res.status(500).json({ error: 'Invalid token' });
    }
}