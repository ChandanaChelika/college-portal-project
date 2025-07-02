const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  department: String,
  year: Number,
  students: [String],
});

module.exports = mongoose.model('Project', projectSchema);