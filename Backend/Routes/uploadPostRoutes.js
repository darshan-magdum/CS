const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const UploadPost = require('../models/UploadPost');

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  }
});

// Initialize upload with storage settings
const upload = multer({ storage: storage });

// Route to create a new upload post
router.post("/createuploadpost", upload.single('postMedia'), async (req, res) => {
  try {
    const { studentID, description } = req.body;
    const postMedia = req.file ? req.file.path : null;

    // Check if all fields are provided
    if (!studentID || !description || !postMedia) {
      return res.status(400).json({ message: 'All fields (studentID, description, postMedia) are required' });
    }

    const newUploadPost = new UploadPost({
      studentID,
      description,
      media: postMedia, // Changed from foodImage to media
    });

    const savedUploadPost = await newUploadPost.save();
    res.status(201).json({ message: 'Upload post added successfully', uploadPost: savedUploadPost });
  } catch (error) {
    console.error('Error creating upload post:', error);
    res.status(500).json({ message: "Failed to create upload post", error: error.message });
  }
});

// Route to update an existing upload post
router.put("/edit/:id", upload.single('postMedia'), async (req, res) => {
  console.log('Received File:', req.file); // Debugging: Log file info
  console.log('Received Body:', req.body); // Debugging: Log form data

  try {
    const { studentID, description } = req.body;
    const postMedia = req.file ? req.file.path : req.body.media; // Use new file if uploaded, else keep the old one
    const uploadPostId = req.params.id;

    // Check if all fields are provided
    if (!studentID || !description) {
      return res.status(400).json({ message: 'All fields (studentID, description) are required' });
    }

    const updatedUploadPost = await UploadPost.findByIdAndUpdate(uploadPostId, {
      studentID,
      description,
      media: postMedia, // Changed from foodImage to media
    }, { new: true });

    if (!updatedUploadPost) {
      return res.status(404).json({ message: 'Upload post not found' });
    }

    res.status(200).json({ message: 'Upload post updated successfully', uploadPost: updatedUploadPost });
  } catch (error) {
    console.error('Error updating upload post:', error);
    res.status(500).json({ message: "Failed to update upload post", error: error.message });
  }
});

// Route to delete an existing upload post
router.delete("/delete/:id", async (req, res) => {
  try {
    const uploadPostId = req.params.id;

    const deletedUploadPost = await UploadPost.findByIdAndDelete(uploadPostId);

    if (!deletedUploadPost) {
      return res.status(404).json({ message: 'Upload post not found' });
    }

    res.status(200).json({ message: 'Upload post deleted successfully', deletedUploadPost });
  } catch (error) {
    console.error('Error deleting upload post:', error);
    res.status(500).json({ message: "Failed to delete upload post", error: error.message });
  }
});

// Route to get all upload posts
router.get("/getalluploadposts", async (req, res) => {
  try {
    const uploadPosts = await UploadPost.find();
    res.status(200).json(uploadPosts);
  } catch (error) {
    console.error('Error fetching upload posts:', error);
    res.status(500).json({ message: "Failed to fetch upload posts", error: error.message });
  }
});

// Route to get upload posts by studentID
router.get("/getbystudent/:studentID", async (req, res) => {
  try {
    const { studentID } = req.params;
    const uploadPosts = await UploadPost.find({ studentID });

    if (!uploadPosts.length) {
      return res.status(404).json({ message: 'No upload posts found for this student' });
    }

    res.status(200).json(uploadPosts);
  } catch (error) {
    console.error('Error fetching upload posts by studentID:', error);
    res.status(500).json({ message: "Failed to fetch upload posts by studentID", error: error.message });
  }
});

module.exports = router;
