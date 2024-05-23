const nodemailer = require('nodemailer');

const sendEmail = (email, username, password) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ebankingebanking7@gmail.com',
            pass: 'xobu guxn ubtv smdg'
        }
    });

    const mailOptions = {
        from: 'ebankingebanking7@gmail.com',
        to: email,
        subject: 'Application Accepted',
        text: `Dear ${username},\n\nYour application has been accepted.\n\nUsername: ${username}\nPassword: ${password}\n\nThank you!`
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
