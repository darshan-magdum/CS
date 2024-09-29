const mongoose = require('mongoose');

const uploadPostSchema = new mongoose.Schema({
  studentID: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  media: { 
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UploadPost = mongoose.model('UploadPost', uploadPostSchema);

module.exports = UploadPost;
