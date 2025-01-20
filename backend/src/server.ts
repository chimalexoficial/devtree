import express from 'express';
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';
import cors from 'cors';
import { corsConfig } from './config/cors';

// db instance
connectDB();

const app = express();

// Cors
app.use(cors(corsConfig));


// read data
app.use(express.json());

app.use('/', router);



export default app;