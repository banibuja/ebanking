const nodemailer = require('nodemailer');

const sendEmailContactUs = async (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ebankingebanking7@gmail.com',
            pass: 'uxvu cmya xiqw nwcc',
        },
    });
    const mailOptions = {
        from: email, 
        to: 'ebankingebanking7@gmail.com', 
        replyTo: email,
        subject: `New message from ${name}`,
        text: `From: ${name}\nMessage: ${message}`, 
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json('Email sent successfully').end();

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json('Error sending email').end();
    }
};

module.exports = {sendEmailContactUs};
