import amqplib from 'amqplib';
import logger from './logger.js';


let conn, channel;
const QUEUE = 'booking_confirmations';


export const getChannel = async () => {
if (channel) return channel;
const rabbitUrl = process.env.RABBITMQ_URL;
if (!rabbitUrl) {
	throw new Error('RABBITMQ_URL environment variable is not defined');
}
conn = await amqplib.connect(rabbitUrl);
channel = await conn.createChannel();
await channel.assertQueue(QUEUE, { durable: true });
logger.info('RabbitMQ channel ready');
return channel;
};


export const publishBookingConfirmation = async (payload) => {
const ch = await getChannel();
ch.sendToQueue(QUEUE, Buffer.from(JSON.stringify(payload)), { persistent: true });
logger.info({ bookingId: payload.bookingId }, 'Published booking confirmation');
};


export const QUEUES = { BOOKING_CONFIRMATIONS: QUEUE };