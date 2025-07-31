const mongoose = require('mongoose');

const RecipientSchema = new mongoose.Schema({
  email: String,
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' },
});

const CampaignSchema = new mongoose.Schema({
  title: String,
  message: String,
  recipients: [RecipientSchema],
  scheduledTime: Date,
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'sent', 'failed'], default: 'pending' }
});

module.exports = mongoose.model('Campaign', CampaignSchema);
