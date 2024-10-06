const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const CreatePost = require('../models/UploadPost'); 

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 'uploads' is the directory where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename
  }
});

// Initialize upload with storage settings
const upload = multer({ storage: storage });

// Route to create a new post
router.post("/createnewpost", upload.single('postImage'), async (req, res) => {
  try {
    const { description, studentID, studentName } = req.body; 

    const postImage = req.file ? req.file.path : null; 

    // Check if all fields are provided
    if (!description || !postImage || !studentID || !studentName) {
      return res.status(400).json({ message: 'All fields (description, postImage, studentID, studentName) are required' });
    }

    const newPost = new CreatePost({
      description,
      postImage, 
      studentID,
      studentName, 
    });

    const savedPost = await newPost.save();
    res.status(201).json({ message: 'Post added successfully', post: savedPost });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: "Failed to create post", error: error.message });
  }
});

// Route to update an existing post
router.put("/edit/:id", upload.single('postImage'), async (req, res) => {
  try {
    const { description, studentID, studentName } = req.body; 
    const postImage = req.file ? req.file.path : req.body.postImage; 
    const postId = req.params.id;

    // Check if all fields are provided
    if (!description || !studentID || !studentName) {
      return res.status(400).json({ message: 'All fields (description, studentID, studentName) are required' });
    }

    const updatedPost = await CreatePost.findByIdAndUpdate(postId, {
      description,
      postImage, 
      studentID,
      studentName, 
    }, { new: true });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post updated successfully', post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: "Failed to update post", error: error.message });
  }
});

// Route to delete an existing post
router.delete("/delete/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await CreatePost.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: "Failed to delete post", error: error.message });
  }
});

// Route to get all posts
router.get("/getallpost", async (req, res) => {
  try {
    const posts = await CreatePost.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: "Failed to fetch posts", error: error.message });
  }
});

// Route to get posts by studentID
router.get("/getbystudent/:studentID", async (req, res) => {
  try {
    const { studentID } = req.params;
    const posts = await CreatePost.find({ studentID });

    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this student' });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts by studentID:', error);
    res.status(500).json({ message: "Failed to fetch posts by studentID", error: error.message });
  }
});

module.exports = router;
