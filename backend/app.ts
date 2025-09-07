import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/db.js';
import logger from './config/logger.js';
import routes from './routes/index.ts';
import { errorHandler } from './middlewares/errorHandler.js';
import rateLimit from 'express-rate-limit';


dotenv.config();
const app = express();


// Core
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(',') || '*' }));
app.use(morgan('combined'));


// Limits on auth
app.use('/auth', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));


// Health
app.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));


// API routes
app.use(routes);


// Errors
app.use(errorHandler);


const start = async () => {
await connectDB();
const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`API listening on :${port}`));
};


start();