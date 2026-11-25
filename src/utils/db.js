import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(__dirname, '../../data/db.json');
const seed = { users: [], contacts: [], patients: [
  {id:'p1',name:'Aline Uwase',age:28,weeks:24,risk:'low',facility:'Kigali Health Center',nextVisit:'2026-12-01'},
  {id:'p2',name:'Grace Mukamana',age:32,weeks:31,risk:'moderate',facility:'Remera Clinic',nextVisit:'2026-11-28'},
  {id:'p3',name:'Marie Ingabire',age:26,weeks:36,risk:'high',facility:'Nyamata Hospital',nextVisit:'2026-11-26'}
], appointments: [], alerts: [
  {id:'a1',patient:'Marie Ingabire',type:'High BP',severity:'high',time:'2026-11-25T08:20:00Z'},
  {id:'a2',patient:'Grace Mukamana',type:'Missed ANC',severity:'moderate',time:'2026-11-25T07:00:00Z'}
]};
export function readDB(){ try { return JSON.parse(fs.readFileSync(file,'utf8')); } catch { fs.mkdirSync(path.dirname(file),{recursive:true}); fs.writeFileSync(file,JSON.stringify(seed,null,2)); return seed; } }
export function writeDB(data){ fs.mkdirSync(path.dirname(file),{recursive:true}); fs.writeFileSync(file,JSON.stringify(data,null,2)); }
