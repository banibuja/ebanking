// contactUsRepository.js

const pool = require('..db/');

const addMessage = async (userId, clientFirstName, clientLastName, subject, message) => {
    try {
        const contactDate = new Date().toISOString();
        const sql = "INSERT INTO ContactUs (`UserID`, `ClientFirstName`, `ClientLastName`, `Subject`, `Message`, `ContactDate`) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [userId, clientFirstName, clientLastName, subject, message, contactDate];
        const result = await pool.query(sql, values);
        return result;
    } catch (error) {
        console.error('Error adding message:', error);
        throw new Error('Internal Server Error');
    }
};

const getMessages = async () => {
    try {
        const sql = "SELECT * FROM ContactUs";
        const messages = await pool.query(sql);
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw new Error('Internal Server Error');
    }
};

module.exports = {
    addMessage,
    getMessages
};
