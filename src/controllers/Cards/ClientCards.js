const db = require('../../db');


const addCard = async (req, res) => {
    try {
        if (!req.session.username) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const cardDetails = req.body;
        const userID = req.session.uId;

        const existingCard = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM Cards WHERE CardNumber = ?`, [cardDetails.CardNumber], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });

        if (existingCard.length > 0) {
            return res.status(400).json({ error: "Card number already exists" });
        }

        const addCardResult = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO Cards (UserID, CardNumber, ExpiryDate, CardHolderName, CardType, CardStatus, AvailableBalance) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [userID, cardDetails.CardNumber, cardDetails.ExpiryDate, cardDetails.CardHolderName, cardDetails.CardType, cardDetails.CardStatus, cardDetails.AvailableBalance],
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
        });

        res.json({ message: 'Card added successfully', cardId: addCardResult.insertId });

    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getCardsclients = (req, res) => {
    const sql = `
    SELECT s.*, u.username FROM cards s inner join users u  on s.UserID = u.userId
  `;
    


    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("fail");
        }
    });
};

const deleteCard = (req, res) => {
    const cardId = req.params.id;
    const sqlDelete = "DELETE FROM Cards WHERE CardID = ?";

    db.query(sqlDelete, cardId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Card deleted successfully" });
    });
};

const updateCard = (req, res) => {
    const cardId = req.params.id;
    const { ExpiryDate, CardHolderName, CardType, CardStatus } = req.body;
    const sqlUpdate = "UPDATE Cards SET ExpiryDate=?, CardHolderName=?, CardType=?, CardStatus=? WHERE CardID=?";

    db.query(sqlUpdate, [ExpiryDate, CardHolderName, CardType, CardStatus, cardId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Card updated successfully" });
    });
};

const blockCard = (req, res) => {
    const cardId = req.params.id;
    const sqlUpdate = "UPDATE Cards SET CardStatus = 'BLOCKED' WHERE CardID = ?";
    db.query(sqlUpdate, [cardId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Card blocked successfully" });
    });
};

const enableCard = (req, res) => {
    const cardId = req.params.id;
    const sqlUpdate = "UPDATE Cards SET CardStatus = 'ACTIVE' WHERE CardID = ?";
    db.query(sqlUpdate, [cardId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Card enabled successfully" });
    });
};

const getCardsForEdit = (req, res) => {
    const cardId = req.params.id;
    // const sql = "SELECT UserID, CardNumber, ExpiryDate, CardHolderName, CardType, CardStatus FROM Cards WHERE CardID = ?";

    const sql = `
    SELECT s.*, u.username FROM cards s inner join users u  on s.UserID = u.userId
    WHERE s.CardID = ?
  `;

    db.query(sql, [cardId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ message: "Card not found" });
        }
    });
};

const getCardsWithSession = (req, res) => {
    const userID = req.session.uId;
    const sql = `
        SELECT c.*, ca.Balance 
        FROM cards c 
        INNER JOIN currentaccounts ca ON c.CurrentAccount = ca.CurrentAccount
        WHERE c.UserID = ?
    `;

    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.status(404).json({ message: "No cards found for the user" });
        }
    });
};
const checkCardExists = (req, res) => {
    const { cardNumber } = req.query;

    try {
        const sql = "SELECT COUNT(*) AS count FROM cards WHERE CardNumber = ?";
        db.query(sql, [cardNumber], (err, result) => {
            if (err) {
                console.error('Error checking card:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            const exists = result[0].count > 0;
            return res.json({ exists });
        });
    } catch (error) {
        console.error('Error checking card:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getCardsByUserID = (req, res) => {
    const { username } = req.body;

const sql = `
    SELECT s.*, u.username FROM cards s inner join users u  on s.UserID = u.userId
    WHERE u.username = ?
  `;
    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(data);
    });
};




module.exports = {addCard, getCardsclients, deleteCard, updateCard, blockCard, enableCard, getCardsForEdit, getCardsWithSession, checkCardExists, getCardsByUserID  };