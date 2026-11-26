import { Router } from 'express';
import Contact from '../models/Contact.js';
const r = Router();
r.post('/', async (req, res) => {
  try {
    const { name, email, org, message } = req.body || {};
    if (!name || !email || !message) return res.status(400).json({ message: 'Name, email and message are required' });
    await Contact.create({ name, email, org: org || '', message });
    res.status(201).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Failed to save message' });
  }
});
export default r;
