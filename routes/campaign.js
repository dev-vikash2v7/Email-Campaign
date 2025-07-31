const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// router.get('/', async (req, res) => {
//   const campaigns = await Campaign.find().sort({ scheduledTime: -1 });
//   res.render('home', { campaigns });
// });

router.get('/campaigns/new', (req, res) => {
  res.render('newCampaign');
});

router.post('/campaigns', async (req, res) => {
  const { title, message, recipients, scheduledTime } = req.body;
  const recipientArr = recipients.split(',').map(email => ({ email: email.trim() }));
  const campaign = await Campaign.create({
    title,
    message,
    recipients: recipientArr,
    scheduledTime
  });

  scheduleCampaignEmail(campaign);

  res.redirect('/');
});

router.get('/', async (req, res) => {
  const campaigns = await Campaign.find().sort({ scheduledTime: -1 });
  console.log('a' ,campaigns , campaigns[2].recipients);
  res.render('campaigns', { campaigns  : campaigns.map(c => c.toObject())});
});

const scheduleCampaignEmail = (campaign) => {
  const now = new Date();
  const sendDate = new Date(campaign.scheduledTime);
  const diff = sendDate - now;

  if (diff <= 0) {
    sendEmails(campaign._id);
  } else {
    setTimeout(() => sendEmails(campaign._id), diff);
  }
};

const sendEmails = async (campaignId) => {
  const campaign = await Campaign.findById(campaignId);
  if (!campaign) return;

  let allSuccess = true;

  for (let recipient of campaign.recipients) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: recipient.email,
        subject: campaign.title,
        html: campaign.message
      });
      recipient.status = 'sent';
      recipient.deliveredAt = new Date();
    } catch (e) {
      recipient.status = 'failed';
      recipient.error = e.message;
      allSuccess = false;
    }
  }

  campaign.status = allSuccess ? 'sent' : 'failed';
  await campaign.save();
};

(async () => {
  const pending = await Campaign.find({ status: 'pending' });
  for (let campaign of pending) {
    scheduleCampaignEmail(campaign);
  }
})();

module.exports = router;
