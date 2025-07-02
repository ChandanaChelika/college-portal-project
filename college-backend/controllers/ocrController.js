// college-backend/controllers/ocrController.js

const Tesseract = require('tesseract.js');
const path = require('path');

exports.extractTextFromImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }

    const imagePath = path.join(__dirname, '../../', req.file.path);

    const result = await Tesseract.recognize(imagePath, 'eng');
    const extractedText = result.data.text;

    res.json({
      success: true,
      message: 'OCR successful',
      text: extractedText
    });
  } catch (err) {
    console.error('OCR error:', err);
    res.status(500).json({ success: false, message: 'OCR failed' });
  }
};