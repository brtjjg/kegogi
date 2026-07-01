const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  icon: { type: String, default: 'fas fa-heartbeat' },
  tag: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', ServiceSchema);
