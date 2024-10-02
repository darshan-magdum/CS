const express = require('express');
const router = express.Router();
const StudentLocation = require('../models/StudentLocation');

// POST: Add a new student location record
router.post('/addlocation', async (req, res) => {
  const { name, contactNumber, location } = req.body;

  const newStudentLocation = new StudentLocation({
    name,
    contactNumber,
    location: {
      type: 'Point',
      coordinates: [location.longitude, location.latitude], // [longitude, latitude]
    },
  });

  try {
    const savedStudentLocation = await newStudentLocation.save();
    res.status(201).json(savedStudentLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: Retrieve all student location records
router.get('/getsafetydetails', async (req, res) => {
  try {
    const studentLocations = await StudentLocation.find();
    res.json(studentLocations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
