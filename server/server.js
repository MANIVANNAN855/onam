require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Registration = require('./models/Registration');

const app = express();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.post('/api/register', upload.single('audioFile'), async (req, res) => {
  try {
    let { event, leaderData, teamMembers, teamId } = req.body;
    
    // Parse stringified JSON fields from FormData
    if (typeof leaderData === 'string') {
      leaderData = JSON.parse(leaderData);
    }
    if (typeof teamMembers === 'string') {
      teamMembers = JSON.parse(teamMembers);
    }

    // Basic validation
    if (!event || !leaderData) {
      return res.status(400).json({ error: 'Event and leader data are required' });
    }

    // Check for duplicate roll numbers (leader or any team member)
    const allRollNos = [leaderData.rollNo];
    if (teamMembers && Array.isArray(teamMembers)) {
      teamMembers.forEach(member => {
        if (member.rollNo) allRollNos.push(member.rollNo);
      });
    }

    const existingRegistration = await Registration.findOne({
      $or: [
        { 'leaderData.rollNo': { $in: allRollNos } },
        { 'teamMembers.rollNo': { $in: allRollNos } }
      ]
    });

    if (existingRegistration) {
      return res.status(409).json({ error: 'Already exsist so unable to register' });
    }

    const newRegistration = new Registration({
      event,
      leaderData,
      teamMembers,
      teamId,
      audioFile: req.file ? req.file.path : null
    });

    await newRegistration.save();
    res.status(201).json({ message: 'Registration successful', data: newRegistration });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Internal server error while saving registration' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
