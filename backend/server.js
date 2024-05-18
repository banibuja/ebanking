const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');


// const database = require('../src/db');
const accessPermissionsController = require('../src/controllers/AccesPermissions/AccesPermissionsController');
const currentAccountController = require('../src/controllers/Accounts/CurrentAccount/CurrentAccounts')
const savingsAccountController = require('../src/controllers/Accounts/SavingsAccount/SavingsAccount');
const cardsController = require('../src/controllers/Cards/ClientCards');
const SessionController = require('../src/controllers/Session/sessioncontroller'); 
const TransactionController = require('../src/controllers/Transaction/Transaction');
const FinancesController = require('../src/controllers/Finances/Goals');

 


const app = express();
app.use(cors({
    origin: ["http://localhost:3000"], 
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
    

})
)


app.get('/sessionTimeRemaining', SessionController.sessionTimeRemaining);

////////////////////////////////////
app.post('/getAccessPermissions', accessPermissionsController.getAccessPermissions);
app.put('/updateAccessPermissions/:id', accessPermissionsController.updateAccessPermission);
////////////////////////////////////
app.get('/getAccount/:id', currentAccountController.getAccountById);
app.put('/updateAccount/:id', currentAccountController.updateAccount);
app.post('/getAccounts', currentAccountController.getAccounts);
app.post('/getAccountById', currentAccountController.getAccountByUserId);
app.delete("/deleteAccounts/:id", currentAccountController.deleteAccount);
// app.post('/getCurrentAccount', currentAccountController.getAccountByUserId);



////////////////////////////////////
app.get('/getSavingsAccounts/:id', savingsAccountController.getSavingsAccountById);
app.post('/getSavings', savingsAccountController.getSavings);
app.delete('/deleteSavings/:id', savingsAccountController.deleteSavings);
app.put('/updateSavingsAccounts/:id', savingsAccountController.updateSavingsAccounts);
app.post('/getSavingsById', savingsAccountController.getSavingsById);


///////////////////////////////////
app.post('/getCardsclients', cardsController.getCards);
app.delete("/deleteCard/:id", cardsController.deleteCard);
app.put('/updateCards/:id', cardsController.updateCard);
app.put('/blockCard/:id', cardsController.blockCard);
app.put('/enableCard/:id', cardsController.enableCard);
app.get('/getCards/:id', cardsController.getCardById);
app.post('/getCards', cardsController.getCardsByUserId);
app.get('/getCardDetails', cardsController.checkCardExists);
app.post('/addCard', cardsController.addCard);


//////////////////////////////////





////////////////////////////////////
app.post('/getCurrentAcc', TransactionController.getCurrentAccount);
app.post('/insertTransaction', TransactionController.insertTransaction);


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ebanking"
})
db.connect((err) => {
    if (err) {
        console.error('DB not connect:', err);
    } else {
        console.log('DB: okey');
    }
});

db.on('error', (err) => {
    console.error('Gabim lidhjen me databaze:', err);
});

app.get('/',  (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, uId: req.session.uId, username: req.session.username, role: req.session.role })
    } else {
        return res.json({ valid: false, sessionExpired: req.session.expired }); 
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({ success: false });
        } else {
            res.clearCookie('connect.sid'); 
            res.json({ success: true });
        }
    });
});





//Login Form
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    const date = new Date();
    expireDate = date.setMinutes(date.getMinutes() + 15)
    db.query(sql,[req.body.username], async (err,result) => {
        if (err) return res.json({ Message: "bad connection " });
        
        if(result.length > 0){
            const comparison = true 
            if(comparison){

                db.query(`SELECT AccessLevel FROM accesspermissions WHERE UserID = ${result[0].userId}`, (error, results) => {
                    if (error) throw error;
                    req.session.role = results[0].AccessLevel; 
                    req.session.uId = result[0].userId;
                    req.session.username = result[0].username;
                    req.session.name = result[0].name; 
                    req.session.lastname = result[0].lastname; 
                    req.session.maxAge = + expireDate;
                    return res.json({Login: true})
                });
            } else {
                return res.json({Login: false});
            }
        } else {
            return res.json({Login: false});
        }
        
    })
})

function generateRandomAccountNumber() {
    const prefix = '11103333'; 
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000); 
    return parseInt(prefix + randomSuffix); 
}


//Users
//AddClient
app.post('/addClient', async (req, res) => {
    try {
        const client = req.body;
        const hashedPassword = await bcrypt.hash(client.password, 10);

        let currentAccount;
        let SavingsType;
        let accountExists = true;

        while (accountExists) {
            currentAccount = generateRandomAccountNumber();
            accountExists = await checkAccountExists(currentAccount);
        }

        SavingsType = generateFlexSaveAccountNumber();

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

        const addAddress = await new Promise((resolve, reject) => {
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
        
        const addRole = await new Promise((resolve, reject) => {
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

        const addSavingsAccount = await new Promise((resolve, reject) => {
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

        const addCurrency = await new Promise((resolve, reject) => {
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


        

        const addAccount = await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO Accounts (UserID, CurrentAccount, SavingsAccount, CurrencyCode) VALUES (?, ?, ?, ?)`, 
                [userId, currentAccount, SavingsType, client.currency, 0, 0], 
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

                 const addCard = await new Promise((resolve, reject) => {
                db.query(
                    `INSERT INTO cards (UserID, CardNumber, ValidFrom, ExpiryDate, CardHolderName, CardType, CardStatus, AvailableBalance) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                    [userId, cardNumber, today.toISOString().split('T')[0], formattedExpiryDate, client.name, "DEBIT MASTER CARD", "ACTIVE", "0"],
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
});


function generateFlexSaveAccountNumber() {
    const prefix = '11102222'; 
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000); 
    return parseInt(prefix + randomSuffix); 
}

async function checkAccountExists(accountNumber) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS count FROM currentaccounts WHERE CurrentAccount = ?`, [accountNumber], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result[0].count > 0);
            }
        });
    });
}


//Users
app.post('/getUsers', async (req, res) => {
    var users;
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
                db.query(`SELECT * FROM users u INNER JOIN adresa a ON a.userID=u.userId WHERE u.userId = ${accessPermission.UserID}`, (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results[0]);
                    }
                });
            });
        });

        users = await Promise.all(userPromises);
    } catch (error) {
        console.error(error);
    }
    return res.json(users);
});

app.delete("/deleteUsers/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM users WHERE id = ?";
  
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    });
});


app.put('/updateUsers/:id', (req, res) => {
    const userId = req.params.id;
    const { name, lastname, email, account, password, dateb, gender, phonenumber } = req.body;
    const sqlUpdate = "UPDATE users SET name=?, lastname=?, email=?, account=?, password=?, dateb=?, gender=?, phonenumber=? WHERE id=? AND role = 'user'"

    db.query(sqlUpdate, [name, lastname, email, account, password, dateb, gender, phonenumber, userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "User updated successfully" });
    });
});



app.get('/getUsers/:id', (req, res) => {
    const staffId = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ? AND role = 'user'";

    db.query(sql, [staffId], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]); 
        } else {
            return res.status(404).json({ error: "User not found" });
        }
    });
});


app.get('/check-email', async (req, res) => {
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
});



app.listen(8080, () => {
    console.log("Server is running");
    });

