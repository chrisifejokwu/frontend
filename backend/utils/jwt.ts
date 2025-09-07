import jwt from 'jsonwebtoken';


interface UserPayload {
	_id: string;
	email: string;
}

export const signToken = (user: UserPayload) => {
	const secret = process.env.JWT_SECRET as jwt.Secret;
	if (!secret) {
		throw new Error('JWT_SECRET environment variable is not defined');
	}
	return jwt.sign(
		{ sub: user._id, email: user.email },
		secret,
		{ expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as jwt.SignOptions
	);
};


export const verifyToken = (token) => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error('JWT_SECRET environment variable is not defined');
	}
	return jwt.verify(token, secret);
};