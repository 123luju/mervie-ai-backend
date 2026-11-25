import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { readDB, writeDB } from '../utils/db.js';
import { auth } from '../middleware/auth.js';
const r = Router();
const sign = (u)=>jwt.sign({id:u.id,email:u.email,role:u.role,name:u.name}, process.env.JWT_SECRET||'dev_secret', {expiresIn:'7d'});
const safe = (u)=>({id:u.id,name:u.name,email:u.email,role:u.role});

r.post('/register', async (req,res)=>{
  const {name,email,password,role} = req.body||{};
  if(!name||!email||!password) return res.status(400).json({message:'Name, email and password are required'});
  const db=readDB();
  if(db.users.find(u=>u.email.toLowerCase()===email.toLowerCase())) return res.status(409).json({message:'Email already registered'});
  const hash = await bcrypt.hash(password,10);
  const user = {id:uuid(), name, email:email.toLowerCase(), password:hash, role:role||'Mother', createdAt:new Date().toISOString()};
  db.users.push(user); writeDB(db);
  res.status(201).json({token:sign(user), user:safe(user)});
});

r.post('/login', async (req,res)=>{
  const {email,password} = req.body||{};
  const db=readDB();
  const user=db.users.find(u=>u.email.toLowerCase()===(email||'').toLowerCase());
  if(!user || !(await bcrypt.compare(password||'', user.password))) return res.status(401).json({message:'Invalid credentials'});
  res.json({token:sign(user), user:safe(user)});
});

r.get('/me', auth, (req,res)=>{
  const db=readDB(); const user=db.users.find(u=>u.id===req.user.id);
  if(!user) return res.status(404).json({message:'User not found'});
  res.json({user:safe(user)});
});

export default r;
