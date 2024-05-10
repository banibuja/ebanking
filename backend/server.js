const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');



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


  

app.get('/sessionTimeRemaining',  (req, res) => {
    if (req.session && req.session.username) {
        const now = new Date().getTime();
        const expireTime = req.session.maxAge;
        if (now > expireTime) {
            req.session.expired = true;
            return res.json({ timeRemaining: 0 });
        } else {
            const timeRemaining = Math.round((expireTime - now) / 1000);
            console.log(timeRemaining);
            return res.json({ timeRemaining });
        }
    } else {
        return res.status(401).json({ error: "User session not found" });
    }
});

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
    if(req.session.username){
        // console.log(req.session);
        return res.json({ valid: true, uId: req.session.uId, username: req.session.username, role: req.session.role })
    } else {
        return res.json({ valid: false, sessionExpired: req.session.expired }); 
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            // console.log(err);
            res.json({ success: false });
        } else {
            res.clearCookie('connect.sid'); 
            res.json({ success: true });
        }
    });
});
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    const date = new Date();
    expireDate = date.setMinutes(date.getMinutes() + 15)
    db.query(sql,[req.body.username], async (err,result) => {
        if (err) return res.json({ Message: "bad connection " });
        
        if(result.length > 0){
            const comparison = true 
            // console.log(comparison);
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
    const prefix = '11102343'; 
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000); 
    return parseInt(prefix + randomSuffix); 
}
app.post('/addClient', async (req, res) => {
    try {
        const client = req.body;
        const hashedPassword = await bcrypt.hash(client.password, 10);

        let currentAccount;
        let accountExists = true;

        while (accountExists) {
            currentAccount = generateRandomAccountNumber();
            accountExists = await checkAccountExists(currentAccount);
        }

        const addClient = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO users (username, name, lastname, email, password, gender, birthday) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
                [client.username, client.name, client.lastname, client.email, hashedPassword, client.gender, client.birthday], 
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                });
        });

        const addAddress = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO adresa (userId, Country, City, Street) VALUES (?, ?, ?, ?)`, 
                [addClient.insertId, client.Country, client.City, client.Street], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
        });
        
        const addRole = await new Promise((resolve, reject) => {
            db.query(`INSERT INTO accesspermissions (UserID, AccessLevel) VALUES (?, ?)`, 
                [addClient.insertId, 'User'], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
        });


        const addAccounts = await new Promise((resolve, reject) => {
            const userId = addClient.insertId; 
            db.query(`INSERT INTO accounts (UserID, CurrentAccount, Balance) VALUES (?, ?, ?)`, [userId, currentAccount, 0], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        return res.json(addClient);
      
    } catch (error) {
        console.error('Error adding client:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function checkAccountExists(accountNumber) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS count FROM accounts WHERE CurrentAccount = ?`, [accountNumber], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result[0].count > 0);
            }
        });
    });
}

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
        // console.log(users);
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




app.post('/addCard', async (req, res) => {
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

        const addCard = await new Promise((resolve, reject) => {
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

        res.json({ message: 'Card added successfully', cardId: addCard.insertId });

    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getCardDetails', async (req, res) => {
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
});



app.post('/contactUs', (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.session.uId;
    const clientFirstName = req.session.name;
    const clientLastName = req.session.lastname;
    const contactDate = new Date().toISOString(); 

    const sql = "INSERT INTO ContactUs (`UserID`, `ClientFirstName`, `ClientLastName`, `Subject`, `Message`, `ContactDate`) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        userId,
        clientFirstName,
        clientLastName,
        req.body.Subject,
        req.body.Message,
        contactDate, 
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    });
});


app.post('/getCards', (req, res) => {
    const userID = req.session.uId; 

    const sql = "SELECT * FROM Cards WHERE UserID = ?"; 

    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("fail");
        }
    });
});

app.post('/getContactUs', (req, res) => {
    const sql = "SELECT * FROM ContactUs ";


    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("faile");
        }
    })
})
app.post('/getAccounts', (req, res) => {
    const sql = "SELECT * FROM Accounts ";


    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("faile");
        }
    })
})
app.post('/getAccountById/:id', (req, res) => {
    
    const userId = req.params.id;
    const sql = `SELECT * FROM Accounts WHERE UserID = ${userId}`;


    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("faile");
        }
    })
})



app.delete("/deleteCard/:id", (req, res) => {
    const contactId = req.params.id;
    const sqlDelete = "DELETE FROM Cards WHERE CardID = ?";
  
    db.query(sqlDelete, contactId, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "Message deleted successfully" });
    });
});


app.delete("/deleteContacts/:id", (req, res) => {
    const contactId = req.params.id;
    const sqlDelete = "DELETE FROM ContactUs WHERE ContactID = ?";
  
    db.query(sqlDelete, contactId, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "Message deleted successfully" });
    });
});
app.delete("/deleteAccounts/:id", (req, res) => {
    const AccountID = req.params.id;
    const sqlDelete = "DELETE FROM Accounts WHERE AccountID = ?";
  
    db.query(sqlDelete, AccountID, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "Message deleted successfully" });
    });
});





app.post('/addStaff', async (req, res) => {
    const banknumber = "2223" + Math.floor(1000 + Math.random() * 9000);
    const accountNumber = '';
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const sql = "INSERT INTO users (`name`, `lastname`, `banknumber`, `account`, `email`, `password`, `dateb`, `gender`, `phonenumber`, `role`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'staff')";
        const values = [
            req.body.name,
            req.body.lastname,
            banknumber,
            accountNumber,
            req.body.email,
            hashedPassword, 
            req.body.dateb,
            req.body.gender,
            req.body.phonenumber,
            req.body.role
        ];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            return res.json(result);
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/getStaff/:id', (req, res) => {
    const staffId = req.params.id;
    const sql = "SELECT * FROM users WHERE id = ? AND role = 'staff'";

    db.query(sql, [staffId], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]); 
        } else {
            return res.status(404).json({ error: "User not found or is not a staff member" });
        }
    });
});
app.post('/getStaff', (req, res) => {
    const sql = "SELECT * FROM users WHERE role = 'staff'";


    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("faile");
        }
    })
})

app.post('/getAcc', (req, res) => {
    const sql = "SELECT * FROM accountcategories";


    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("faile");
        }
    })
})
app.put('/updateAcc/:id', (req, res) => {
    const accId = req.params.id;
    const { name,  ratings } = req.body;
    const sqlUpdate =  "UPDATE accountcategories SET name=?,  ratings=? WHERE id=?"

    db.query(sqlUpdate, [name,  ratings, accId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "User updated successfully" });
    });
});
app.delete("/deleteAcc/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM accountcategories WHERE id = ?";
  
    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    });
});



app.post('/accountsacc', (req, res) => {
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    
    const code = "ACC-CAT-" + randomCode;

    const sql = "INSERT INTO accountcategories (`name`, `ratings`, `code`, `description`)  VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.ratings,
        code,
        req.body.description
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.json("Error");
        }
        return res.json(data);
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
app.get('/getUserData/:role/:id', (req, res) => {
    const userRole = req.params.role;
    const userId = req.params.id;
    var tableName = '';
    if (userRole == "user") tableName = `users`
    else if (userRole == "staff") tableName = 'staffi';
    else tableName = 'admin';
    const sql = `SELECT * FROM ${tableName} WHERE id = ?`;

    db.query(sql, [userId], (err, data) => {
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

