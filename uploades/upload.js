const multer = require('multer');
const path = require('path');

// Define storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in uploads folder
  },
  filename: (req, file, cb) => {
    cb(`null, ${Date.now()}-${file.originalname}`); // Rename file with timestamp
  }
});

// Optional: Allow only certain file types (like images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .jpeg, .jpg, and .png formats allowed!'), false);
  }
};

// Create and export the upload middleware
const upload = multer({ storage, fileFilter });

module.exports = upload;