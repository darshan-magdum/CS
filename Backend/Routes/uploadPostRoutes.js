const express = require('express');
const multer = require('multer');
const UploadPost = require('../Models/UploadPost'); 

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to filename
  },
});

const upload = multer({ storage: storage });

// Route for creating a new upload post
router.post('/upload-posts', upload.single('media'), async (req, res) => {
  const { studentID, description } = req.body;
  const media = req.file.path; // Get the file path from multer

  try {
    const newUploadPost = new UploadPost({
      studentID,
      description,
      media,
    });

    await newUploadPost.save();
    res.status(201).json(newUploadPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
