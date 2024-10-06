const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
});

const UserSignup = mongoose.model('StudentSignup', StudentSchema);

module.exports = UserSignup;
