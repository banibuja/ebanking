const bcrypt = require('bcrypt');
const db = require('../../db');
const sendEmail = require('../Client/sendEmail');
const {  generateRandomAccountNumber, generateFlexSaveAccountNumber, checkCurrentAccountExists, checkSaveAccountExists, checkCardExists, generateRandomPassword } = require('./helpers');
const jwt = require('jsonwebtoken');

const addClient = async (req, res) => {
    try {
        const client = req.body;
        
        const randomPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        let currentAccount;
        let accountExists = true;

        while (accountExists) {
            currentAccount = generateRandomAccountNumber();
            accountExists = await checkCurrentAccountExists(currentAccount);
        }
        
        let savingsAccount;
        let savingsaccountExists = true;

        while (savingsaccountExists) {
            savingsAccount = generateFlexSaveAccountNumber();
            savingsaccountExists = await checkSaveAccountExists(currentAccount);
        }

        const addClient = await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users (username, name, lastname, email, password, gender, birthday, CurrencyCode, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Active')`, 
                [client.username, client.name, client.lastname, client.email, hashedPassword, client.gender, client.birthday, 'EUR'], 
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        });

        const userId = addClient.insertId;

        await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO adresa (userId, Country, City, Street) VALUES (?, ?, ?, ?)`, 
                [userId, client.Country, client.City, client.Street], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
        
        await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO accesspermissions (UserID, AccessLevel) VALUES (?, ?)`, 
                [userId, 'User'], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO currentaccounts (UserID, CurrentAccount, Balance, CurrencyCode, AccountStatus) VALUES (?, ?, ?, ?, ?)`, 
                [userId, currentAccount, 0, 'EUR', 'Open'], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO savingsaccounts (UserID, SavingAccount , Balance, CurrencyCode, AccountStatus) VALUES (?, ?, ?, ?, ?)`, 
                [userId, savingsAccount, 0, 'EUR', 'Open'], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
 
        let cardNumber;
        let cardExists = true;
        while (cardExists) {
            cardNumber = `53547${Math.floor(100000000000 + Math.random() * 900000000000)}`;
            cardExists = await checkCardExists(currentAccount);
        }
        const today = new Date();
        const expiryDate = new Date(today);
        expiryDate.setFullYear(expiryDate.getFullYear() + 4);
        const formattedExpiryDate = expiryDate.toISOString().split('T')[0];

        await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO cards (UserID, CurrentAccount, CardNumber, ValidFrom, ExpiryDate, CardHolderName, CardType, CardStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [userId, currentAccount, cardNumber, today.toISOString().split('T')[0], formattedExpiryDate, `${client.name} ${client.lastname}`, "DEBIT MASTER CARD", "ACTIVE"],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        try {
            await sendEmail(client.name, client.lastname, client.email, client.username, randomPassword);
            console.log('Email sent successfully');
        } catch (emailError) {
            console.error('Error sending email:', emailError);
        }

        return res.status(200).json(addClient).end();
    } catch (error) {
        console.error('Error adding client:', error);
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
};


const getUsers = async (req, res) => {
    try {
        const accessPermissions = await new Promise((resolve, reject) => {
            db.query(`SELECT UserID FROM accesspermissions WHERE AccessLevel = 'User'`, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        const userPromises = accessPermissions.map(accessPermission => {
            return new Promise((resolve, reject) => {
                db.query(`SELECT * FROM users u INNER JOIN adresa a ON a.userID=u.userId WHERE u.userId = ?`, [accessPermission.UserID], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0]);
                    }
                });
            });
        });

        const users = await Promise.all(userPromises);
        return res.status(200).json(users).end();
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
};


const getClientForEdit = (req, res) => {
    const clientID = req.params.id;
    const sql = `
        SELECT u.*, a.Country, a.City, a.Street 
        FROM users u 
        INNER JOIN adresa a ON a.userId = u.userId 
        WHERE u.userId = ?
    `;

    db.query(sql, [clientID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end();
        } else {
            return res.status(204).json({ message: "Client not found" }).end();
        }
    });
};

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const client = req.body;

    try {

        const updateUserPromise = new Promise((resolve, reject) => {
            const query = `
                UPDATE users 
                SET username = ?, name = ?, lastname = ?, email = ?, gender = ?, birthday = ?, CurrencyCode = ?
                WHERE userId = ?
            `;
            const values = [client.username, client.name, client.lastname, client.email, client.gender, client.birthday, client.currency];
            values.push(userId);

            db.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        const updateAddressPromise = new Promise((resolve, reject) => {
            db.query(
                `UPDATE adresa SET Country = ?, City = ?, Street = ? WHERE userId = ?`,
                [client.Country, client.City, client.Street, userId],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        await Promise.all([updateUserPromise, updateAddressPromise]);

        return res.status(200).json({ message: 'User updated successfully' }).end();
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
};

const getByUserID = (req, res) => {
    const { username } = req.body;
    const sql = `
    SELECT u.*, a.Country, a.City, a.Street 
    FROM users u 
    INNER JOIN adresa a ON a.userId = u.userId 
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

const deleteClient = (req, res) => {
    const userID = req.params.id;
    const sqlDelete = "DELETE FROM users WHERE userId = ?";

    db.query(sqlDelete, userID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Card deleted successfully" }).end();
    });
};

const checkEmail = async (req, res) => {
    const { email } = req.query;

    try {
        const sql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error('Error checking email:', err);
                return res.status(500).json({ error: 'Internal Server Error' }).end();
            }
            const exists = result[0].count > 0;
            return res.status(200).json({ exists }).end();
        });
    } catch (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
};

const checkUsername = async (req, res) => {
    const { username } = req.query;

    try {
        const sql = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
        db.query(sql, [username], (err, result) => {
            if (err) {
                console.error('Error checking username:', err);
                return res.status(500).json({ error: 'Internal Server Error' }).end();
            }
            const exists = result[0].count > 0;
            return res.status(200).json({ exists }).end();
        });
    } catch (error) {
        console.error('Error checking username:', error);
        return res.status(500).json({ error: 'Internal Server Error' }).end();
    }
};

const getUsersWithSession = (req, res) => {
   
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
        const sql = "SELECT * FROM users WHERE userId = ?";

        db.query(sql, [userID], (err, data) => {
            if (err) {
                return res.status(500).json("Error").end();
            }
            if (data.length > 0) {
                return res.status(200).json(data).end();
            } else {
                return res.status(204).json("fail").end();
            }
        }); 
    } catch (error) {
        res.status(401).send("not logged in").end();
      }
};

module.exports = { addClient, getUsers, getUsersWithSession, getClientForEdit, checkEmail, checkUsername, updateUser, getByUserID, deleteClient };



