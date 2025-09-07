import pino from 'pino';
import { Logger } from 'seq-logging';



const seq = new Logger({
	serverUrl: process.env.SEQ_SERVER_URL,
	apiKey: process.env.SEQ_API_KEY || undefined,
	onError: (err: Error) => {
		console.error('Seq Logger Error:', err);
	}
});


const logger = pino({
level: 'info',
transport: {
target: 'pino-pretty',
options: { colorize: true }
}
});


// pipe pino messages to seq
const originalInfo = logger.info.bind(logger);
logger.info = function (...args: any[]) {
	let obj: any = {};
	let msg: string = '';
	if (typeof args[0] === 'string') {
		msg = args[0];
	} else {
		obj = args[0];
		msg = args[1] || '';
	}
	seq.emit({ timestamp: new Date(), level: 'Information', messageTemplate: msg, properties: obj });
	return originalInfo(...args);
};


logger.error = ((orig) => (...args: any[]) => {
	let obj: any = {};
	let msg: string = '';
	if (typeof args[0] === 'string') {
		msg = args[0];
	} else {
		obj = args[0];
		msg = args[1] || '';
	}
	seq.emit({ timestamp: new Date(), level: 'Error', messageTemplate: msg, properties: obj });
	return orig(...args);
})(logger.error.bind(logger));


export default logger;