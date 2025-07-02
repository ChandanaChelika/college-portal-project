const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;
const MONGO_URI = 'mongodb://localhost:27017/yourdbname';

// Connect to MongoDB (no deprecated options)
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Middleware to parse JSON bodies and urlencoded form data (for user_id)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads folder if not exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Mongoose schema and model for uploaded files
const fileSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  userId: String, // optional user id
});
const UploadedFile = mongoose.model('UploadedFile', fileSchema);

// Test route
app.get('/api/test', (req, res) => {
  res.send('API is working');
});

// GET /api/verify - returns query parameters in JSON
app.get('/api/verify', (req, res) => {
  const { user_id, basic_url, api_key } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required in query' });
  }

  res.json({
    success: true,
    message: 'GET request received',
    user_id,
    basic_url: basic_url || 'not provided',
    api_key: api_key || 'not provided'
  });
});

// POST /api/verify - upload ID image and save info in MongoDB
app.post('/api/verify', upload.single('idImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const userId = req.body.user_id || req.query.user_id || null;

    const uploadedFile = new UploadedFile({
      filename: req.file.filename,
      originalname: req.file.originalname,
      userId,
    });

    await uploadedFile.save();

    res.json({
      success: true,
      message: 'File uploaded and info saved to database',
      file: req.file.filename,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
