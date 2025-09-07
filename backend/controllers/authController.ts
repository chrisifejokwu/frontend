import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';


export const register = async (req, res, next) => {
try {
const { name, email, password } = req.body;
const exists = await User.findOne({ email });
if (exists) return res.status(409).json({ message: 'Email already registered' });
const passwordHash = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, passwordHash });
const token = signToken({ _id: user._id.toString(), email: user.email });
res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (e) { next(e); }
};


export const login = async (req, res, next) => {
try {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
const token = signToken({ _id: user._id.toString(), email: user.email });
res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
} catch (e) { next(e); }
};


export const profile = async (req, res) => {
const user = await User.findById(req.user.id).select('name email createdAt');
res.json({ user });
};