import mongoose from 'mongoose';
import logger from './logger.js';


export const connectDB = async () => {
const uri = process.env.MONGO_URI;
if (!uri) {
logger.error('MONGO_URI is not defined in environment variables');
process.exit(1);
}
try {
await mongoose.connect(uri, { dbName: uri.split('/').pop() });
logger.info('MongoDB connected');
} catch (err) {
logger.error({ err }, 'Mongo connection error');
process.exit(1);
}
};