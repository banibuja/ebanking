// contactUsController.js

const { addMessage, getMessages } = require('../repositories/contactUsRepository');

const addContactMessage = async (req, res) => {
    try {
        if (!req.session.username) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const userId = req.session.uId;
        const clientFirstName = req.session.name;
        const clientLastName = req.session.lastname;
        const { Subject, Message } = req.body;

        await addMessage(userId, clientFirstName, clientLastName, Subject, Message);
        
        return res.status(201).json({ message: "Message added successfully" });
    } catch (error) {
        console.error('Error adding contact message:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getContactMessages = async (req, res) => {
    try {
        const messages = await getMessages();
        return res.json(messages);
    } catch (error) {
        console.error('Error getting contact messages:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    addContactMessage,
    getContactMessages
};
