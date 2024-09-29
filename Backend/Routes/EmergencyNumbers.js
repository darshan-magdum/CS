const express = require('express');
const router = express.Router();
const EmergencyContact = require('../Models/AddEmergencyNumbers');

// Create a new emergency contact
router.post('/addNewContact', async (req, res) => {
    try {
        const { name, contactNo, studentId } = req.body; // Include studentId
        const emergencyContact = new EmergencyContact({ name, contactNo, studentId });
        await emergencyContact.save();
        res.status(201).json(emergencyContact);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        } else if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).json({ message: 'Contact number must be unique.' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all emergency contacts
router.get('/getAllEmergencyContacts', async (req, res) => {
    try {
        const emergencyContacts = await EmergencyContact.find();
        res.json(emergencyContacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all emergency contacts for a specific studentId
router.get('/getEmergencyContactsByStudentId/:studentId', async (req, res) => {
    try {
        const emergencyContacts = await EmergencyContact.find({ studentId: req.params.studentId });
        if (emergencyContacts.length === 0) return res.status(404).json({ message: 'No emergency contacts found for this student ID' });
        res.json(emergencyContacts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get an emergency contact by ID
router.get('/getSpecificEmergencyContact/:id', async (req, res) => {
    try {
        const emergencyContact = await EmergencyContact.findById(req.params.id);
        if (!emergencyContact) return res.status(404).json({ message: 'Emergency contact not found' });
        res.json(emergencyContact);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update an emergency contact
router.put('/updateEmergencyContact/:id', async (req, res) => {
    try {
        const { name, contactNo, studentId } = req.body; // Include studentId
        const emergencyContact = await EmergencyContact.findByIdAndUpdate(
            req.params.id,
            { name, contactNo, studentId }, // Update studentId as well
            { new: true, runValidators: true }
        );
        if (!emergencyContact) return res.status(404).json({ message: 'Emergency contact not found' });
        res.json(emergencyContact);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        } else if (error.code === 11000) {
            return res.status(400).json({ message: 'Contact number must be unique.' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete an emergency contact
router.delete('/deleteEmergencyContact/:id', async (req, res) => {
    try {
        const emergencyContact = await EmergencyContact.findByIdAndDelete(req.params.id);
        if (!emergencyContact) return res.status(404).json({ message: 'Emergency contact not found' });
        res.json({ message: 'Emergency contact deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
