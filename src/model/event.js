const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  contact_details: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  booked_users: { type: [String], default: [] }
});

module.exports = mongoose.model('Event', eventSchema);
