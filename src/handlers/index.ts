import User from "../models/User";
import { Request, Response } from 'express'
import { hashPassword } from "../utils/auth";


export const createAccount = async (req: Request, res: Response)=> {

    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error('The user is already registered');
        res.status(409).json({ error: error.message});
        return;
    }



    // inserting into mongoDB database with hashed password
    const user = new User(req.body);
    user.password = await hashPassword(password);
    await user.save();

    res.send('User created! :)')
}