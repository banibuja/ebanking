const nodemailer = require('nodemailer');

const sendTransactionEmail = async (transactionDetails) => {
    const { senderEmail, receiverAccID, transactionType, transactionAmount, currency, additionalInfo } = transactionDetails;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ebankingebanking7@gmail.com',
            pass: 'uxvu cmya xiqw nwcc',
        },
    });

    const htmlBody = `
        <p>Sender Email: ${senderEmail}</p>
        <p>Receiver Account ID: ${receiverAccID}</p>
        <p>Transaction Type: ${transactionType}</p>
        <p>Transaction Amount: ${transactionAmount}</p>
        <p>Currency: ${currency}</p>
        <p>Additional Info: ${additionalInfo}</p>
    `;

    const textMessage = `
        Sender Email: ${senderEmail}
        Receiver Account ID: ${receiverAccID}
        Transaction Type: ${transactionType}
        Transaction Amount: ${transactionAmount}
        Currency: ${currency}
        Additional Info: ${additionalInfo}
    `;

    const mailOptions = {
        from: 'ebankingebanking7@gmail.com', // Sender email
        to: [senderEmail, 'ebankingebanking7@gmail.com'], // Send email to user and yourself
        subject: `Transaction Confirmation for ${transactionType}`,
        html: htmlBody,
        text: textMessage,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports = sendTransactionEmail;
