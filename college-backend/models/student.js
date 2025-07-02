const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idNumber: { type: String, required: true },
  collegeName: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);