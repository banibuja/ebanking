const db = require('../../db');
const jwt = require('jsonwebtoken')
const insertLog = require('../Logs/LogsAdmin').insertLog; 


const addCard = async (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);
        
        if (!decodedToken.username) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const cardDetails = req.body;
        const userID = decodedToken.userId;

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
            return res.status(400).json({ error: "Card number already exists" }).end();
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

        res.status(200).json({ message: 'Card added successfully', cardId: addCardResult.insertId }).end();

    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({ error: 'Internal Server Error' }).end();
    }
};


const getCardsclients = (req, res) => {
    const sql = `
    SELECT s.*, u.username FROM cards s inner join users u  on s.UserID = u.userId
  `;
    


    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data).end();
        } else {
            return res.status(204).json("fail").end();
        }
    });
};

const deleteCard = async (req, res) => {
    const cardId = req.params.id;

    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const adminId = decodedToken.userId;



    const sqlDelete = "DELETE FROM Cards WHERE CardID = ?";

    db.query(sqlDelete, cardId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Card deleted successfully" }).end();
    });
    await insertLog(adminId, 'delete', 'delete the card'); 

} catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' }).end();
}
};

const updateCard = async(req, res) => {
    const cardId = req.params.id;
    const { ExpiryDate, CardHolderName, CardType, CardStatus } = req.body;

    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const adminId = decodedToken.userId;


    const sqlUpdate = "UPDATE Cards SET ExpiryDate=?, CardHolderName=?, CardType=?, CardStatus=? WHERE CardID=?";

    db.query(sqlUpdate, [ExpiryDate, CardHolderName, CardType, CardStatus, cardId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Card updated successfully" }).end();
    });
    await insertLog(adminId, 'update', 'update the card'); 

} catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' }).end();
}
};

const blockCard = (req, res) => {
    const cardId = req.params.id;
    const sqlUpdate = "UPDATE Cards SET CardStatus = 'BLOCKED' WHERE CardID = ?";
    db.query(sqlUpdate, [cardId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Card blocked successfully" }).end();
    });
};

const enableCard = (req, res) => {
    const cardId = req.params.id;
    const sqlUpdate = "UPDATE Cards SET CardStatus = 'ACTIVE' WHERE CardID = ?";
    db.query(sqlUpdate, [cardId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Card enabled successfully" }).end();
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
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end();
        } else {
            return res.status(204).json({ message: "Card not found" }).end();
        }
    });
};

const getCardsWithSession = (req, res) => { 
    try {
        const token = req.cookies.authToken; 
        if (!token) {
            return res.status(401).json({ message: "JWT token is missing" }).end();
        }

        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
        const sql = `
            SELECT c.*, ca.Balance 
            FROM cards c 
            INNER JOIN currentaccounts ca ON c.CurrentAccount = ca.CurrentAccount
            WHERE c.UserID = ?
        `;

        db.query(sql, [userID], (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" }).end();
            }
            if (data.length > 0) {
                return res.status(200).json(data).end();
            } else {
                return res.status(204).json({ message: "No cards found for the user" }).end();
            }
        });
    } catch (error) {
        console.error('getCardsWithSession verification failed:', error);
        return res.status(401).json({ message: "JWT token verification failed" }).end();
    }
};
const checkCardExists = (req, res) => {
    const { cardNumber } = req.query;

    try {
        const sql = "SELECT COUNT(*) AS count FROM cards WHERE CardNumber = ?";
        db.query(sql, [cardNumber], (err, result) => {
            if (err) {
                console.error('Error checking card:', err);
                return res.status(500).json({ error: 'Internal Server Error' }).end();
            }
            const exists = result[0].count > 0;
            return res.status(200).json({ exists }).end();
        });
    } catch (error) {
        console.error('Error checking card:', error);
        return res.status(500).json({ error: 'Internal Server Error' }).end();
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
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json(data).end();
    });
};




module.exports = {addCard, getCardsclients, deleteCard, updateCard, blockCard, enableCard, getCardsForEdit, getCardsWithSession, checkCardExists, getCardsByUserID  };