const mongoose = require('mongoose');

const createPostSchema = new mongoose.Schema({
    description: { type: String, required: true },
    postImage: { type: String, required: true },
    studentID: { type: String, required: true }
});

const CreatePost = mongoose.model('CreatePost', createPostSchema);

module.exports = CreatePost;
