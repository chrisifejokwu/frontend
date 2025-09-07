import { verifyToken } from '../utils/jwt.js';


export const requireAuth = (req, res, next) => {
const auth = req.headers.authorization || '';
const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
if (!token) return res.status(401).json({ message: 'Missing token' });
try {
const payload = verifyToken(token);
if (typeof payload === 'string' || !payload.sub || !('email' in payload)) {
	return res.status(401).json({ message: 'Invalid token payload' });
}
req.user = { id: payload.sub, email: (payload as any).email };
next();
} catch {
return res.status(401).json({ message: 'Invalid token' });
}
};