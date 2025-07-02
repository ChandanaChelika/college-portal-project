const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./college-backend/models/project');

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

// Sample project data
const projects = [
  {
    title: 'Smart Attendance System',
    description: 'Uses face recognition to mark attendance.',
    collegeName: 'ABC College of Engineering'
  },
  {
    title: 'AI Chatbot for College Helpdesk',
    description: 'A chatbot that answers student queries using AI.',
    collegeName: 'ABC College of Engineering'
  },
  {
    title: 'IoT-based Energy Monitoring',
    description: 'Monitors and analyzes real-time energy usage.',
    collegeName: 'XYZ Institute of Technology'
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');
    await Project.deleteMany({});
    await Project.insertMany(projects);
    console.log('Project data seeded successfully!');
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });