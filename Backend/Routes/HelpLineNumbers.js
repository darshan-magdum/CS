const express = require('express');
const router = express.Router();
const Helpline = require('../Models/AddHelplineNumbers');

// Create a new helpline number
router.post('/addnewNumber', async (req, res) => {
    try {
        const { name, contactNo, adminId } = req.body; 
        const helpline = new Helpline({ name, contactNo, adminId });
        await helpline.save();
        res.status(201).json(helpline);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        } else if (error.code === 11000) { // MongoDB duplicate key error
            return res.status(400).json({ message: 'Contact number must be unique.' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all helpline numbers
router.get('/getallHelplineNumbers', async (req, res) => {
    try {
        const helplines = await Helpline.find();
        res.json(helplines);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a helpline number by ID
router.get('/GetSpecificHelplineNumber/:id', async (req, res) => {
    try {
        const helpline = await Helpline.findById(req.params.id);
        if (!helpline) return res.status(404).json({ message: 'Helpline not found' });
        res.json(helpline);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a helpline number
router.put('/UpdateHelplineNumber/:id', async (req, res) => {
    try {
        const { name, contactNo, adminId } = req.body; 
        const helpline = await Helpline.findByIdAndUpdate(
            req.params.id,
            { name, contactNo, adminId }, 
            { new: true, runValidators: true }
        );
        if (!helpline) return res.status(404).json({ message: 'Helpline not found' });
        res.json(helpline);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        } else if (error.code === 11000) {
            return res.status(400).json({ message: 'Contact number must be unique.' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a helpline number
router.delete('/DeleteHelplineNumber/:id', async (req, res) => {
    try {
        const helpline = await Helpline.findByIdAndDelete(req.params.id);
        if (!helpline) return res.status(404).json({ message: 'Helpline not found' });
        res.json({ message: 'Helpline deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
