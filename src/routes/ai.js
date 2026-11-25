import { Router } from 'express';
import { auth } from '../middleware/auth.js';
const r = Router();
r.post('/assess', auth, (req,res)=>{
  const { symptoms=[], weeks=20, age=25 } = req.body||{};
  const redFlags = ['bleeding','severe headache','blurred vision','swelling','fever','reduced movement','convulsion','severe pain'];
  const hits = symptoms.filter(s=>redFlags.some(f=>String(s).toLowerCase().includes(f)));
  const level = hits.length>=2?'high':hits.length===1?'moderate':'low';
  const advice = level==='high' ? 'Seek immediate medical attention or emergency referral.' : level==='moderate' ? 'Contact your midwife or healthcare provider within 24 hours.' : 'Continue routine antenatal care and monitor symptoms.';
  res.json({ level, hits, advice, weeks, age, disclaimer:'Mervie AI provides decision support, not a medical diagnosis. Always consult a qualified healthcare professional.' });
});
export default r;
