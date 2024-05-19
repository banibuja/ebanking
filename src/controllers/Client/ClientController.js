
const bcrypt = require('bcrypt');
const db = require('../../db');
const { generateRandomAccountNumber, generateFlexSaveAccountNumber, checkAccountExists } = require('./helpers');

const addClient = async (req, res) => {
    try {
        const client = req.body;
        const hashedPassword = await bcrypt.hash(client.password, 10);

        let currentAccount;
        let accountExists = true;

        while (accountExists) {
            currentAccount = generateRandomAccountNumber();
            accountExists = await checkAccountExists(currentAccount);
        }

        const SavingsType = generateFlexSaveAccountNumber();

        const addClient = await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users (username, name, lastname, email, password, gender, birthday, CurrencyCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [client.username, client.name, client.lastname, client.email, hashedPassword, client.gender, client.birthday, client.currency], 
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
                `INSERT INTO currentaccounts (UserID, CurrentAccount, Balance, CurrencyCode) VALUES (?, ?, ?, ?)`, 
                [userId, currentAccount, 0, client.currency], 
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
                `INSERT INTO savingsaccounts (UserID, SavingsType, Balance, CurrencyCode) VALUES (?, ?, ?, ?)`, 
                [userId, SavingsType, 0, client.currency], 
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
                `INSERT INTO currencies (UserID, CurrencyCode, ExchangeRate) VALUES (?, ?, ?)`,
                [userId, client.currency, 1.0], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        const cardNumber = `53547${Math.floor(100000000000 + Math.random() * 900000000000)}`;
        const today = new Date();
        const expiryDate = new Date(today);
        expiryDate.setFullYear(expiryDate.getFullYear() + 4);
        const formattedExpiryDate = expiryDate.toISOString().split('T')[0];

        await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO cards (UserID, CardNumber, ValidFrom, ExpiryDate, CardHolderName, CardType, CardStatus, AvailableBalance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [userId, cardNumber, today.toISOString().split('T')[0], formattedExpiryDate, `${client.name} ${client.lastname}`, "DEBIT MASTER CARD", "ACTIVE", "0"],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                }
            );
        });

        return res.json(addClient);
      
    } catch (error) {
        console.error('Error adding client:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
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
        return res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
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
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ message: "Client not found" });
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

        return res.json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getByUserID = (req, res) => {
    const { UserID } = req.body;
    const sql = `
    SELECT u.*, a.Country, a.City, a.Street 
    FROM users u 
    INNER JOIN adresa a ON a.userId = u.userId 
    WHERE u.userId = ?
`;
    db.query(sql, [UserID], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(data);
    });
};

const deleteClient = (req, res) => {
    const userID = req.params.id;
    const sqlDelete = "DELETE FROM users WHERE userId = ?";

    db.query(sqlDelete, userID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Card deleted successfully" });
    });
};

const checkEmail = async (req, res) => {
    const { email } = req.query;

    try {
        const sql = "SELECT COUNT(*) AS count FROM users WHERE email = ?";
        db.query(sql, [email], (err, result) => {
            if (err) {
                console.error('Error checking email:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            const exists = result[0].count > 0;
            return res.json({ exists });
        });
    } catch (error) {
        console.error('Error checking email:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const checkUsername = async (req, res) => {
    const { username } = req.query;

    try {
        const sql = "SELECT COUNT(*) AS count FROM users WHERE username = ?";
        db.query(sql, [username], (err, result) => {
            if (err) {
                console.error('Error checking username:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            const exists = result[0].count > 0;
            return res.json({ exists });
        });
    } catch (error) {
        console.error('Error checking username:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { addClient, getUsers, getClientForEdit, checkEmail, checkUsername, updateUser, getByUserID, deleteClient };



