import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  name: String, age: Number, weeks: Number, risk: String, facility: String, nextVisit: String,
}, { timestamps: true });
export default mongoose.model('Patient', schema);
