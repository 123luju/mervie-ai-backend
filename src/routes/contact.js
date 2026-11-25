import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { readDB, writeDB } from '../utils/db.js';
const r = Router();
r.post('/', (req,res)=>{
  const {name,email,org,message}=req.body||{};
  if(!name||!email||!message) return res.status(400).json({message:'Name, email and message are required'});
  const db=readDB(); db.contacts.push({id:uuid(),name,email,org:org||'',message,createdAt:new Date().toISOString()}); writeDB(db);
  res.status(201).json({ok:true});
});
export default r;
