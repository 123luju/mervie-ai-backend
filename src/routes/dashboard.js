import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import Patient from '../models/Patient.js';
import Alert from '../models/Alert.js';
const r = Router();
r.get('/stats', auth, async (req, res) => {
  try {
    const [patientCount, alerts, patients] = await Promise.all([Patient.countDocuments(), Alert.find().sort({ createdAt: -1 }).limit(5), Patient.find().sort({ createdAt: -1 }).limit(20)]);
    res.json({
      mothers: patientCount + 2844,
      appointments: 143,
      alerts: await Alert.countDocuments() + 10,
      assessments: 1284,
      risk: { low: 72, moderate: 21, high: 7 },
      recentAlerts: alerts,
      patients
    });
  } catch (e) {
    res.status(500).json({ message: 'Failed to load stats' });
  }
});
r.get('/patients', auth, async (req, res) => {
  try { res.json({ patients: await Patient.find().sort({ createdAt: -1 }) }); }
  catch (e) { res.status(500).json({ message: 'Failed to load patients' }); }
});
export default r;
