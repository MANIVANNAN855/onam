const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true }
}, { _id: false });

const RegistrationSchema = new mongoose.Schema({
  event: { 
    type: String, 
    required: true,
    enum: ['Pookolam', 'Duo Dance', 'Fashion Parade', 'Tug Of War']
  },
  leaderData: {
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    year: { type: String, required: true }
  },
  teamMembers: [MemberSchema],
  audioFile: { type: String }, // Store path or filename of uploaded audio
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);
