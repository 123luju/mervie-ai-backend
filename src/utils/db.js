import mongoose from 'mongoose';
import Patient from '../models/Patient.js';
import Alert from '../models/Alert.js';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  await mongoose.connect(uri);
  console.log('MongoDB connected');
  await seed();
}

async function seed() {
  const count = await Patient.countDocuments();
  if (count > 0) return;
  await Patient.insertMany([
    { name: 'Aline Uwase', age: 28, weeks: 24, risk: 'low', facility: 'Kigali Health Center', nextVisit: '2026-12-01' },
    { name: 'Grace Mukamana', age: 32, weeks: 31, risk: 'moderate', facility: 'Remera Clinic', nextVisit: '2026-11-28' },
    { name: 'Marie Ingabire', age: 26, weeks: 36, risk: 'high', facility: 'Nyamata Hospital', nextVisit: '2026-11-26' },
  ]);
  await Alert.insertMany([
    { patient: 'Marie Ingabire', type: 'High BP', severity: 'high', time: new Date('2026-11-25T08:20:00Z') },
    { patient: 'Grace Mukamana', type: 'Missed ANC', severity: 'moderate', time: new Date('2026-11-25T07:00:00Z') },
  ]);
}
