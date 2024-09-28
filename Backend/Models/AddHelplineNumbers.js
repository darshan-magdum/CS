const mongoose = require('mongoose');

const helplineNumberSchema = new mongoose.Schema({
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
                return /^\+?\d{10,15}$/.test(v); // Adjust regex as needed
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    adminId: {
        type: String, 
        required: [true, 'Admin ID is required']
    }
});

const Helpline = mongoose.model('HelplineNumbers', helplineNumberSchema);

module.exports = Helpline;
