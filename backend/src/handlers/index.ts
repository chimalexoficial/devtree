import User from "../models/User";
import slug from 'slug';
import { validationResult } from "express-validator";
import { Request, Response } from 'express';
import { hashPassword, checkPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";


export const createAccount = async (req: Request, res: Response) => {



    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error('This email is already registered. Please, use another one.');
        res.status(409).json({ error: error.message });
        return;
    }

    const handle = slug(req.body.handle, '');
    const handleExists = await User.findOne({ handle });

    if (handleExists) {
        const error = new Error('This username is not available. Please use another one.');
        res.status(409).json({ error: error.message });
        return;
    }



    // inserting into mongoDB database with hashed password
    const user = new User(req.body);
    user.password = await hashPassword(password);
    user.handle = handle;

    await user.save();

    res.status(201).send('User created successfully! :)');
}

export const login = async (req: Request, res: Response) => {
    // handle errors
    let errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        const error = new Error('User not found');
        res.status(404).json({ error: error.message });
        return;
    }

    // checking password for the user
    const isPasswordCorrect = await checkPassword(password, user.password);
    if (!isPasswordCorrect) {
        const error = new Error('Incorrect password, check again');
        res.status(401).json({ error: error.message });
        return;
    }

    const token = generateJWT({ id: user.id });
    res.send(token)
}

export const getUser = async (req: Request, res: Response) => {
    res.json(req.user);
}