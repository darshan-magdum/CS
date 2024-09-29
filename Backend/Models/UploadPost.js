const mongoose = require('mongoose');

const createPostSchema = new mongoose.Schema({
    description: { type: String, required: true },
    postImage: { type: String, required: true },
    studentID: { type: String, required: true },
    studentName: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now } 
});

const CreatePost = mongoose.model('CreatePost', createPostSchema);

module.exports = CreatePost;
