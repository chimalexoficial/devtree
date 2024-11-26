import User from "../models/User";
import { Request, Response } from 'express'


export const createAccount = async (req: Request, res: Response)=> {

    const { email } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error('The user is already registered');
        res.status(409).json({ error: error.message});
        return;
    }



    // inserting into mongoDB database
    const user = new User(req.body);
    await user.save();

    res.send('User created! :)')
}