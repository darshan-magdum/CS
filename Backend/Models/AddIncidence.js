const mongoose = require('mongoose');

const addIncidentSchema = new mongoose.Schema({
    incidentDescription: { type: String, required: true },
    incidentLocation: { type: String, required: true },
    reportedBy: { type: String, required: true },
    incidentDate: { type: Date, required: true },
    incidentImage: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const AddIncident = mongoose.model('AddIncident', addIncidentSchema);

module.exports = AddIncident;
