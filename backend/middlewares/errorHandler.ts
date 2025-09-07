import logger from '../config/logger.js';


export const errorHandler = (err, req, res, next) => { // eslint-disable-line
logger.error({ err: err.message, stack: err.stack }, 'Unhandled error');
const status = err.status || 500;
res.status(status).json({ message: err.message || 'Server error' });
};