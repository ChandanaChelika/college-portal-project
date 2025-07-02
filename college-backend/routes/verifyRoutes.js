const express = require('express');
const router = express.Router();
const Tesseract = require('tesseract.js');

router.post('/upload', async (req, res) => {
  // Dummy endpoint placeholder
  res.json({ message: 'OCR upload endpoint' });
});

module.exports = router;