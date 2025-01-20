import mongoose from "mongoose";
import { IUser } from "../models/User";


export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI);
        const url = `${connection.host}:${connection.port}`;

        console.log(`MongoDB connected: ${url}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}