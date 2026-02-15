const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');

// POST /api/upload
// Ye route ek single image lega aur uska URL wapas dega
router.post('/', upload.single('image'), (req, res) => {
  try {
    // Agar file upload ho gayi, toh Cloudinary humein 'path' deta hai
    res.json({ 
        message: "Image Uploaded! 🚀", 
        url: req.file.path // Ye hai wo permanent URL
    });
  } catch (error) {
    res.status(500).json({ error: "Upload Failed bhai 😢" });
  }
});

module.exports = router;