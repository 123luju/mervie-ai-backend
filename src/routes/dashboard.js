import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { readDB } from '../utils/db.js';
const r = Router();
r.get('/stats', auth, (req,res)=>{
  const db=readDB();
  res.json({
    mothers: db.patients.length + 2844,
    appointments: 143,
    alerts: db.alerts.length + 10,
    assessments: 1284,
    risk: { low:72, moderate:21, high:7 },
    recentAlerts: db.alerts.slice(-5).reverse(),
    patients: db.patients
  });
});
r.get('/patients', auth, (req,res)=>{ res.json({patients: readDB().patients}); });
export default r;
