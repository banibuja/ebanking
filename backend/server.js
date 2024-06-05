const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken'); // for token generation and verification
const bcrypt = require('bcrypt');
require('dotenv').config();

// Importing controllers
const clientController = require('./controllers/Client/ClientController');
const applyOnlineController = require('./controllers/ApplyOnline/ApplyOnline');
const accessPermissionsController = require('./controllers/AccesPermissions/AccesPermissionsController');
const currentAccountController = require('./controllers/Accounts/CurrentAccount/CurrentAccounts');
const savingsAccountController = require('./controllers/Accounts/SavingsAccount/SavingsAccount');
const cardsController = require('./controllers/Cards/ClientCards');
const SessionController = require('./controllers/Session/sessioncontroller');
const TransactionController = require('./controllers/Transaction/Transaction');
const investmentsGoals = require('./controllers/Investments/InvestmentsGoals');
const currenciesController = require('./controllers/Currencies/Currencies');
const profileController = require('./controllers/Profile/Profile');
const loansController = require('./controllers/Loans/Loans');
const contactusController = require('./controllers/Contact/sendEmailContactForm');
const saveTransactionController = require('./controllers/Transaction/SaveTransaction');
const HomeController = require('./controllers/Add-Home-page/Add-InfoSection');
const CaruselController = require('./controllers/Add-Home-page/AddCarusel');
const AboutUSController = require('./controllers/AboutUs/AddAbouUs');
const TeamController = require('./controllers/AboutUs/Team');
//const supportController =require('./controllers/Support/sendMessage');
const app = express();

// Middleware for handling CORS
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/sendEmailContactUs',         contactusController.sendEmailContactUs);

app.post('/insertInfoSection',          HomeController.insertInfoSection);
app.get('/getInfoSection',              HomeController.getInfoSection);
app.get('/getInfoForEdit/:id',          HomeController.getInfoForEdit);
app.put('/updateInfo/:id',              HomeController.updateInfo);
app.delete("/deleteInfo/:id",           HomeController.deleteInfo);
app.post('/insertCarusel',              CaruselController.insertCarusel);
app.post('/getCarusel',                 CaruselController.getCarusel);
app.get('/getCaruselForEdit/:id',       CaruselController.getCaruselForEdit);
app.put('/updateCarusel/:id',           CaruselController.updateCarusel);
app.delete("/deleteCarusel/:id",        CaruselController.deleteCarusel);

app.post('/getAllFlexSave',             saveTransactionController.getSavingsAccounts);
app.post('/insertSaveTransaction',      saveTransactionController.insertSaveTransaction);
app.get('/getAllHistory',               saveTransactionController.getAllHistory);

app.get('/sessionTimeRemaining',        SessionController.sessionTimeRemaining);

app.post('/addApply',                   applyOnlineController.addApply);
app.get('/getApply',                    applyOnlineController.getApply);
app.put('/updateStatus/:id',            applyOnlineController.updateStatus);
app.delete("/deleteApplicant/:id",      applyOnlineController.deleteApplicant);
app.get('/getApplicantForEdit/:id',     applyOnlineController.getApplicantForEdit);
app.put('/updateAplicant/:id',          applyOnlineController.updateAplicant);
app.post('/searchApplicant',            applyOnlineController.searchApplicant);

app.post('/addClient',                  clientController.addClient);
app.post('/getUsers',                   clientController.getUsers);
app.get('/getClientForEdit/:id',        clientController.getClientForEdit);
app.put('/updateUser/:id',              clientController.updateUser);
app.post('/searchUsers',                clientController.getByUserID);
app.delete("/deleteClient/:id",         clientController.deleteClient);
app.get('/checkUsername',               clientController.checkUsername);
app.get('/checkEmail',                  clientController.checkEmail);

app.post('/getUsersWithSession',        clientController.getUsersWithSession);

app.post('/getAllPermissions',          accessPermissionsController.getAllPermissions);
app.put('/updateAccessPermissions/:id', accessPermissionsController.updateAccessPermission);
app.post('/searchAccessPermissionss',   accessPermissionsController.searchAccessPermissionss);
app.get('/getAccesForEdit/:id',         accessPermissionsController.getAccesForEdit);

app.get('/getAccountForEdit/:id',       currentAccountController.getAccountForEdit);
app.put('/updateAccount/:id',           currentAccountController.updateAccount);
app.post('/getAllAccounts',             currentAccountController.getAllAccounts);
app.post('/getAccountBySession',        currentAccountController.getAccountBySession);
app.delete("/deleteAccounts/:id",       currentAccountController.deleteAccount);
app.post('/searchAccounts',             currentAccountController.getAccountByUserID);

app.post('/getAllSavingAccount',        savingsAccountController.getAllSavingAccount);
app.get('/getSavingsAccounts/:id',      savingsAccountController.getSavingsAccountById);
app.delete('/deleteSavings/:id',        savingsAccountController.deleteSavings);
app.put('/updateSavingsAccounts/:id',   savingsAccountController.updateSavingsAccounts);
app.post('/getSavingsBySesison',        savingsAccountController.getSavingsBySesison);
app.post('/searchSavingsAccounts',      savingsAccountController.getAccountByUserID);

app.post('/getCardsclients',            cardsController.getCardsclients);
app.delete("/deleteCard/:id",           cardsController.deleteCard);
app.put('/updateCards/:id',             cardsController.updateCard);
app.put('/blockCard/:id',               cardsController.blockCard);
app.put('/enableCard/:id',              cardsController.enableCard);
app.get('/getCardsForEdit/:id',         cardsController.getCardsForEdit);
app.post('/getCardsWithSession',        cardsController.getCardsWithSession);
app.get('/checkCardExists',             cardsController.checkCardExists);
app.post('/addCard',                    cardsController.addCard);
app.post('/searchCards',                cardsController.getCardsByUserID);

app.post('/getCurrencies',              currenciesController.getCurrencies);
app.get('/getCurrenciesForEdit/:id',    currenciesController.getCurrenciesForEdit);
app.put('/updateCurrencies/:id',        currenciesController.updateCurrencies);
app.delete("/deleteCurrencies/:id",     currenciesController.deleteCurrencies);

app.post('/getGoalsWithSession',        investmentsGoals.getGoalsBySession);
app.post('/addGoal',                    investmentsGoals.addGoal);
app.get('/getGoalsForEdit/:id',         investmentsGoals.getGoalsForEdit);
app.put('/updateGoal/:id',              investmentsGoals.updateGoal);
app.delete("/deleteGoals/:id",          investmentsGoals.deleteGoals);

app.post('/insertAboutUs',              AboutUSController.insertAboutUs);
app.get('/getAboutUs',                  AboutUSController.getAboutUs);
app.get('/getAboutUsEdit/:id',          AboutUSController.getAboutUsEdit);
app.put('/updateAboutUs/:id',           AboutUSController.updateAboutUs);
app.delete("/deleteAboutUs/:id",        AboutUSController.deleteAboutUs);

app.post('/insertTeam',                 TeamController.insertTeam);
//app.post('/sendMessage',  supportController.sendMessage);



app.post('/getClientforProfile', profileController.getClientforProfile);
app.put('/updateProfile', profileController.updateProfile);
app.post('/updateProfilePicture', profileController.updateProfilePicture);
app.put('/updatePassword', profileController.updatePassword);

app.post('/getCurrentAcc', TransactionController.getCurrentAccount);
app.post('/insertTransaction', TransactionController.insertTransaction);
app.post('/getAllTransactions', TransactionController.getAllTransactions);

app.post('/getAllnterTransactions', TransactionController.getAllnterTransactions);

app.post('/getAllLoans', loansController.getAllLoans);
app.get('/getAccountNumber', loansController.getAccountNumber);
app.post('/applyLoan', loansController.applyLoan);
app.post('/addLoan', loansController.addLoan);
app.delete("/deleteLoan/:id", loansController.deleteLoan);
app.get('/editLoans/:id', loansController.getLoanForEdit);
app.put('/updateLoan/:id', loansController.updateLoan);
app.put('/updateStatusLoans/:id', loansController.updateStatusLoans);

app.post('/getAllLoansForClient', loansController.getAllLoansForClient);

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ebanking"
});
db.connect((err) => {
    if (err) {
        console.error('DB not connect:', err);
    } else {
        console.log('DB: okey');
    }
});
db.on('error', (err) => {
    console.error('Database connection error:', err);
});

app.get('/', (req, res) => {
    const token = req.cookies.authToken;
    
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.json({ valid: false, sessionExpired: req.session.expired });
        } else {
            return res.json({ valid: true, uId: decoded.uId, username: decoded.username, role: decoded.role });
        }
      });

});

app.get('/logout', (req, res) => {
    console.log('loged out');
    res.clearCookie('connect.sid');
    res.clearCookie('authToken').send('Logged out successfully');
});

app.post('/loginform', async (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?";


    db.query(sql, [req.body.username], async (err, result) => {
        if (err) {
            console.error("Error connecting to database:", err);
            return res.json({ Message: "bad connection", Login: false });
        }

        if (result.length > 0) {
            const storedHashedPassword = result[0].password;
            console.log("Stored hashed password:", storedHashedPassword);

            bcrypt.compare(req.body.password, storedHashedPassword, (compareErr, comparison) => {
                if (compareErr) {
                    console.error("Error comparing passwords:", compareErr);
                    return res.json({ Message: "Error during login", Login: false });
                }

                if (comparison) {
                    const lastLogin = new Date()
                    const userId = result[0].userId;
                    db.query("UPDATE users SET last_login = ? WHERE userId = ?", [lastLogin, userId], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error("Error updating last login timestamp:", updateErr);
                            return res.json({ Message: "Error during login", Login: false });
                        }
                    });

                    db.query(`SELECT AccessLevel FROM accesspermissions WHERE UserID = ${userId}`, (error, results) => {
                        if (error) {
                            console.error("Error querying access permissions:", error);
                            return res.json({ Message: "Error during login", Login: false });
                        }

                        const accessToken = jwt.sign({ userId, username: result[0].username, role:results[0].AccessLevel }, process.env.SECRET, { expiresIn: '15m' });

                        res.cookie('authToken',accessToken,{ 
                            maxAge: 3600000, 
                            httpOnly: true, 
                            secure: true 
                          })
                        res.json({ accessToken, message: "Login successful", Login: true });
                    });
                } else {
                    console.log(comparison);
                    return res.json({ Message: "Incorrect password", Login: false });
                }
            });
        } else {
            return res.json({ Message: "Username not found", Login: false });
        }
    });
});


app.post('/refresh_token', async (req, res) => {
    // const refreshToken = req.session.refreshToken;

    // jwt.verify(refreshToken, 'refresh_token_secret', (err, decoded) => {
    //     if (err) {
    //         return res.sendStatus(403); // Forbidden
    //     }
    //     const accessToken = jwt.sign({ userId: decoded.userId }, 'access_token_secret', { expiresIn: '15m' });
    //     res.json({ accessToken });
    // });
});

app.listen(8080, () => {
    console.log("Server is running");
});
