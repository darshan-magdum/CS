const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    postedBy: { type: String, required: true }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
