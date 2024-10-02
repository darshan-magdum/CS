const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Article = require('../Models/AddArticle'); 

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

// Route to create a new article
router.post("/addarticle", upload.single('image'), async (req, res) => {
  try {
    const { title, description, postedBy } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !description || !image || !postedBy) {
      return res.status(400).json({ message: 'All fields (title, description, image, postedBy) are required' });
    }

    const newArticle = new Article({
      title,
      description,
      image,
      postedBy,
    });

    const savedArticle = await newArticle.save();
    res.status(201).json({ message: 'Article added successfully', article: savedArticle });
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ message: "Failed to create article", error: error.message });
  }
});

// Route to update an existing article
router.put("/editarticle/:id", upload.single('image'), async (req, res) => {
  try {
    const { title, description, postedBy } = req.body;
    const image = req.file ? req.file.path : req.body.image; // Use new file if uploaded, else keep the old one
    const articleId = req.params.id;

    if (!title || !description || !postedBy) {
      return res.status(400).json({ message: 'All fields (title, description, postedBy) are required' });
    }

    const updatedArticle = await Article.findByIdAndUpdate(articleId, {
      title,
      description,
      image,
      postedBy,
    }, { new: true });

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ message: "Failed to update article", error: error.message });
  }
});

// Route to delete an existing article
router.delete("/deletearticle/:id", async (req, res) => {
  try {
    const articleId = req.params.id;

    const deletedArticle = await Article.findByIdAndDelete(articleId);

    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted successfully', deletedArticle });
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ message: "Failed to delete article", error: error.message });
  }
});

// Route to get all articles
router.get("/getallarticles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: "Failed to fetch articles", error: error.message });
  }
});

// Route to get articles by postedBy
router.get("/getbyposter/:postedBy", async (req, res) => {
  try {
    const { postedBy } = req.params;
    const articles = await Article.find({ postedBy });

    if (!articles.length) {
      return res.status(404).json({ message: 'No articles found for this poster' });
    }

    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles by poster:', error);
    res.status(500).json({ message: "Failed to fetch articles by poster", error: error.message });
  }
});

module.exports = router;
