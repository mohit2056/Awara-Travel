const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config(); // Env variables load karne ke liye

// 1. Cloudinary Setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Storage Engine (Multer ko batana ki file Cloudinary pe rakhni hai)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'awara_places', // Cloudinary pe is folder mein images jayengi
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage });

module.exports = { upload };