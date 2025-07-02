const mongoose = require('mongoose');
const Project = require('./models/project');
const Student = require('./models/student');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    await Project.deleteMany({});
    await Student.deleteMany({});

    await Project.insertMany([
      { title: "AI Chatbot", description: "Built with GPT", domain: "AI" },
      { title: "Campus App", description: "Helps students navigate", domain: "Mobile App" }
    ]);

    await Student.insertMany([
      { name: "Chandana", email: "chandana@example.com", rollNumber: "123" },
      { name: "Raj", email: "raj@example.com", rollNumber: "456" }
    ]);

    console.log("Data seeded!");
    process.exit();
  })
  .catch((err) => console.error("Seed Error:", err));