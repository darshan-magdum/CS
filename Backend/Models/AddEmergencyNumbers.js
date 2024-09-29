const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [100, 'Name must be at most 100 characters long']
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^\+?\d{10,15}$/.test(v); 
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    studentId: {
        type: String,
        required: [true, 'Student ID is required']
    }
});

const EmergencyContact = mongoose.model('EmergencyContacts', emergencyContactSchema);

module.exports = EmergencyContact;
