import User from "../models/User";
import slug from 'slug';
import { validationResult } from "express-validator";
import { Request, Response } from 'express';
import { hashPassword } from "../utils/auth";


export const createAccount = async (req: Request, res: Response) => {

    // handle errors
    let errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error('This email is already registered');
        res.status(409).json({ error: error.message });
        return;
    }

    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });

    if (handleExists) {
        const error = new Error('This username is not available');
        res.status(409).json({ error: error.message });
        return;
    }



    // inserting into mongoDB database with hashed password
    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;

    await user.save();

    res.send('User created! :)')
}