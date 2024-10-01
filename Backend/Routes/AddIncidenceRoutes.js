const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const AddIncident = require('../models/AddIncidence'); // Ensure this points to the updated model

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

// Route to create a new incident
router.post("/addincident", upload.single('incidentImage'), async (req, res) => {
  try {
    const { incidentDescription, incidentLocation, reportedBy, incidentDate } = req.body;

    const incidentImage = req.file ? req.file.path : null;

    // Check if all fields are provided
    if (!incidentDescription || !incidentImage || !incidentLocation || !reportedBy || !incidentDate) {
      return res.status(400).json({ message: 'All fields (incidentDescription, incidentImage, incidentLocation, reportedBy, incidentDate) are required' });
    }

    const newIncident = new AddIncident({
      incidentDescription,
      incidentLocation,
      reportedBy,
      incidentDate,
      incidentImage,
    });

    const savedIncident = await newIncident.save();
    res.status(201).json({ message: 'Incident added successfully', incident: savedIncident });
  } catch (error) {
    console.error('Error creating incident:', error);
    res.status(500).json({ message: "Failed to create incident", error: error.message });
  }
});

// Route to update an existing incident
router.put("/editincident/:id", upload.single('incidentImage'), async (req, res) => {
  console.log('Received File:', req.file); // Debugging: Log file info
  console.log('Received Body:', req.body); // Debugging: Log form data

  try {
    const { incidentDescription, incidentLocation, reportedBy, incidentDate } = req.body;
    const incidentImage = req.file ? req.file.path : req.body.incidentImage; // Use new file if uploaded, else keep the old one
    const incidentId = req.params.id;

    // Check if all fields are provided
    if (!incidentDescription || !incidentLocation || !reportedBy || !incidentDate) {
      return res.status(400).json({ message: 'All fields (incidentDescription, incidentLocation, reportedBy, incidentDate) are required' });
    }

    const updatedIncident = await AddIncident.findByIdAndUpdate(incidentId, {
      incidentDescription,
      incidentLocation,
      reportedBy,
      incidentDate,
      incidentImage,
    }, { new: true });

    if (!updatedIncident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    res.status(200).json({ message: 'Incident updated successfully', incident: updatedIncident });
  } catch (error) {
    console.error('Error updating incident:', error);
    res.status(500).json({ message: "Failed to update incident", error: error.message });
  }
});

// Route to delete an existing incident
router.delete("/deleteincident/:id", async (req, res) => {
  try {
    const incidentId = req.params.id;

    const deletedIncident = await AddIncident.findByIdAndDelete(incidentId);

    if (!deletedIncident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    res.status(200).json({ message: 'Incident deleted successfully', deletedIncident });
  } catch (error) {
    console.error('Error deleting incident:', error);
    res.status(500).json({ message: "Failed to delete incident", error: error.message });
  }
});

// Route to get all incidents
router.get("/getallincidents", async (req, res) => {
  try {
    const incidents = await AddIncident.find();
    res.status(200).json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({ message: "Failed to fetch incidents", error: error.message });
  }
});

// Route to get incidents by reportedBy
router.get("/getbyreporter/:reportedBy", async (req, res) => {
  try {
    const { reportedBy } = req.params;
    const incidents = await AddIncident.find({ reportedBy });

    if (!incidents.length) {
      return res.status(404).json({ message: 'No incidents found for this reporter' });
    }

    res.status(200).json(incidents);
  } catch (error) {
    console.error('Error fetching incidents by reporter:', error);
    res.status(500).json({ message: "Failed to fetch incidents by reporter", error: error.message });
  }
});

module.exports = router;
