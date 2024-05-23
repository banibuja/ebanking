const nodemailer = require('nodemailer');

const sendEmail = async (req, res) => {
    const { from_name, from_email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ebankingebanking7@gmail.com',
            pass: 'uxvu cmya xiqw nwcc',
        },
    });

    const mailOptions = {
        from: from_email,
        to: email,
        subject: `New message from ${from_name}`,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
};


module.exports = sendEmail;
