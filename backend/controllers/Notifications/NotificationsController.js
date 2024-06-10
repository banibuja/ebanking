const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILLOGIN,
        pass: process.env.EMAILPASSWORD,
    },
});

// Route for sending messages
app.post('/sendMessage ', async (req, res) => {
    const { name, lastname, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAILLOGIN,
        to: 'ebankingebanking7@gmail.com',
        replyTo: email,
        subject: `New message from ${name} ${lastname}`,
        text: `From: ${name} ${lastname}\nMessage: ${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
    }
});

// Route for fetching notifications
app.get('/sendNotifications', (req, res) => {
    const notifications = [
        { id: 1, message: "Your recent transaction was successful.", date: new Date() },
        { id: 2, message: "New login detected from a new device.", date: new Date() }
    ];
    res.status(200).json(notifications);
});

// Start the server
//const PORT = process.env.PORT || 3000;
//app.listen(PORT, () => {
  //  console.log(`Server running on port ${PORT}`);
//});
module.exports = {sendNotifications};