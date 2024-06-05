const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = (name, lastname, email, username, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAILLOGIN,
        
            pass: process.env.EMAILPASSWORD,
        }
    });

    const mailOptions = {
        from: 'ebankingebanking7@gmail.com',
        to: email,
        subject: 'Application Accepted',
        text: `Dear ${name + ' ' + lastname},\n\nYour application has been accepted.\n\nUsername: ${username}\nPassword: ${password}\n\nThank you!`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
};

module.exports = sendEmail;
