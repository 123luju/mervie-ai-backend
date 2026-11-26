import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import contactRoutes from './routes/contact.js';
import aiRoutes from './routes/ai.js';
import { connectDB } from './utils/db.js';

dotenv.config();
const app = express();
const origins = [process.env.FRONTEND_URL, 'http://localhost:5173', 'https://mervie-ai.vercel.app'].filter(Boolean);
app.use(helmet());
app.use(cors({ origin: (o, cb) => cb(null, !o || origins.includes(o)), credentials: true }));
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => res.json({ name: 'Mervie AI API', status: 'ok', tagline: 'Intelligence for Maternal Health' }));
app.get('/api/health', (req, res) => res.json({ status: 'healthy', time: new Date().toISOString() }));
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ai', aiRoutes);

app.use((err, req, res, next) => { console.error(err); res.status(500).json({ message: 'Internal server error' }); });

const port = process.env.PORT || 5000;
connectDB()
  .then(() => app.listen(port, () => console.log('Mervie AI API on ' + port)))
  .catch((e) => { console.error('DB connection failed', e); process.exit(1); });
