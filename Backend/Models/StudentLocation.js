const mongoose = require('mongoose');

const studentLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

studentLocationSchema.index({ location: '2dsphere' }); // For geospatial queries

const StudentLocation = mongoose.model('StudentLocation', studentLocationSchema);
module.exports = StudentLocation;
