const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const sendMessage = async (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
        if (!userID) {
            return res.status(401).json("Not logged in").end();
        }

        const sql = "SELECT * FROM users WHERE userId = ?";
        db.query(sql, [userID], async (err, userData) => {
            if (err) {
                return res.status(500).json("Server error").end();
            }
            if (userData.length > 0) {
                const user = userData[0];
                const { email, name } = user; // Assuming these fields exist in your users table
                const { message } = req.body;

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAILLOGIN,
                        pass: process.env.EMAILPASSWORD,
                    },
                });

                const mailOptions = {
                    from: process.env.EMAILLOGIN,
                    to: 'ebankingebanking7@gmail.com',
                    subject: `New message from ${name}`, // Changed from user to name for clarity
                    text: `From: ${name} (${email})\nMessage: ${message}`,
                };

                try {
                    await transporter.sendMail(mailOptions);
                    res.status(200).json('Email sent successfully').end();
                } catch (error) {
                    console.error('Error sending email:', error);
                    res.status(500).json('Error sending email').end();
                }
            } else {
                return res.status(404).json("User not found").end();
            }
        });
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).json("Authentication failed").end();
    }
};

module.exports = { sendMessage };