import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  patient: String, type: String, severity: String, time: Date,
}, { timestamps: true });
export default mongoose.model('Alert', schema);
