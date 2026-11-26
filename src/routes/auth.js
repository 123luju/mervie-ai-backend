import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
const r = Router();
const sign = (u) => jwt.sign({ id: u._id, email: u.email, role: u.role, name: u.name }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
const safe = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role });

r.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hash, role: role || 'Mother' });
    res.status(201).json({ token: sign(user), user: safe(user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message || 'Registration failed' });
  }
});

r.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = await User.findOne({ email: (email || '').toLowerCase() });
    if (!user || !(await bcrypt.compare(password || '', user.password))) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ token: sign(user), user: safe(user) });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message || 'Login failed' });
  }
});

r.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user: safe(user) });
  } catch (e) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

export default r;
