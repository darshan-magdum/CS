const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { jwtkey } = require('../keys');
const  StudentSignup  = require('../Models/StudentAuthSchema'); 
const mongoose = require('mongoose');


// Validation schema for signup using Joi
const signupSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  email: Joi.string().email().required().label('Email'),
  mobile: Joi.string().required().label('Mobile'),
  password: Joi.string().required().label('Password'),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('Confirm Password')
    .messages({ 'any.only': 'Passwords must match' }),
});

// Validation schema for login using Joi
const loginSchema = Joi.object({
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().required().label('Password'),
});

// Route: POST /signup
router.post('/Usersignup', async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { name, email, mobile, password } = req.body;

    // Check if user already exists
    let user = await StudentSignup.findOne({ email });
    if (user) {
      return res.status(400).send({ message: 'Student already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    user = new StudentSignup({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtkey);

    // Return token and user ID
    res.status(201).send({ token, userId: user._id, message: 'Student registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route: POST /login
router.post('/Userlogin', async (req, res) => {
  try {
    // Validate request body using Joi
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    // Check if user exists
    let user = await StudentSignup.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Student authenticated, generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtkey);

    // Return the token and any additional data you may need
    res.status(200).send({ token, userId: user._id, message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


// Route: GET /user/:id 
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Validate if userId is a valid ObjectId (assuming MongoDB ObjectId)
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: 'Invalid user ID' });
    }

    // Find user by ID in the database
    const user = await StudentSignup.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // Return user details (username, email, mobile)
    res.status(200).send({
      userId: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Validation schema for updating user details using Joi
const updateSchema = Joi.object({
  name: Joi.string().required().label('Name'),
  mobile: Joi.string().required().label('Mobile'),
});

// Route: PUT /user/:id 
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, mobile } = req.body;

    // Validate request body using Joi
    const { error } = updateSchema.validate({ name, mobile });
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Update user details in the database
    const updatedUser = await StudentSignup.findByIdAndUpdate(
      userId,
      { name, mobile },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send({ message: 'Student not found' });
    }

  
    // Return updated user details
    res.status(200).send({
      userId: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      message: 'Student details updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route: GET /users (get all users)



router.get('/', async (req, res) => {
  try {
    // Fetch all users from the database, excluding the password field
    const users = await StudentSignup.find({}, { password: 0 });

    // Return array of users
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
