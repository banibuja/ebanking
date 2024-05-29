const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');

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


const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(bodyParser.json());


app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }
}));

app.post('/sendEmailContactUs', contactusController.sendEmailContactUs);

app.post('/insertInfoSection', HomeController.insertInfoSection);
app.post('/getInfoSection', HomeController.getInfoSection);
app.post('/insertCarusel', CaruselController.insertCarusel);
app.post('/getCarusel', CaruselController.getCarusel);

app.post('/getAllFlexSave', saveTransactionController.getSavingsAccounts);
app.post('/insertSaveTransaction', saveTransactionController.insertSaveTransaction);
app.post('/getAllHistory', saveTransactionController.getAllHistory);

app.get('/sessionTimeRemaining', SessionController.sessionTimeRemaining);
app.get('/resetSession', SessionController.resetSession);

app.post('/addApply', applyOnlineController.addApply);
app.post('/getApply', applyOnlineController.getApply);
app.put('/updateStatus/:id', applyOnlineController.updateStatus);
app.delete("/deleteApplicant/:id", applyOnlineController.deleteApplicant);
app.get('/getApplicantForEdit/:id', applyOnlineController.getApplicantForEdit);
app.put('/updateAplicant/:id', applyOnlineController.updateAplicant);
app.post('/searchApplicant', applyOnlineController.searchApplicant);

app.post('/addClient', clientController.addClient);
app.post('/getUsers', clientController.getUsers);
app.get('/getClientForEdit/:id', clientController.getClientForEdit);
app.put('/updateUser/:id', clientController.updateUser);
app.post('/searchUsers', clientController.getByUserID);
app.delete("/deleteClient/:id", clientController.deleteClient);
app.get('/checkUsername', clientController.checkUsername);
app.get('/checkEmail', clientController.checkEmail);
app.post('/getUsersWithSession', clientController.getUsersWithSession);

app.post('/getAllPermissions', accessPermissionsController.getAllPermissions);
app.put('/updateAccessPermissions/:id', accessPermissionsController.updateAccessPermission);
app.post('/searchAccessPermissionss', accessPermissionsController.searchAccessPermissionss);
app.get('/getAccesForEdit/:id', accessPermissionsController.getAccesForEdit);

app.get('/getAccountForEdit/:id', currentAccountController.getAccountForEdit);
app.put('/updateAccount/:id', currentAccountController.updateAccount);
app.post('/getAllAccounts', currentAccountController.getAllAccounts);
app.post('/getAccountBySession', currentAccountController.getAccountBySession);
app.delete("/deleteAccounts/:id", currentAccountController.deleteAccount);
app.post('/searchAccounts', currentAccountController.getAccountByUserID);

app.post('/getAllSavingAccount', savingsAccountController.getAllSavingAccount);
app.get('/getSavingsAccounts/:id', savingsAccountController.getSavingsAccountById);
app.delete('/deleteSavings/:id', savingsAccountController.deleteSavings);
app.put('/updateSavingsAccounts/:id', savingsAccountController.updateSavingsAccounts);
app.post('/getSavingsBySesison', savingsAccountController.getSavingsBySesison);
app.post('/searchSavingsAccounts', savingsAccountController.getAccountByUserID);

app.post('/getCardsclients', cardsController.getCardsclients);
app.delete("/deleteCard/:id", cardsController.deleteCard);
app.put('/updateCards/:id', cardsController.updateCard);
app.put('/blockCard/:id', cardsController.blockCard);
app.put('/enableCard/:id', cardsController.enableCard);
app.get('/getCardsForEdit/:id', cardsController.getCardsForEdit);
app.post('/getCardsWithSession', cardsController.getCardsWithSession);
app.get('/checkCardExists', cardsController.checkCardExists);
app.post('/addCard', cardsController.addCard);
app.post('/searchCards', cardsController.getCardsByUserID);

app.post('/getCurrencies', currenciesController.getCurrencies);
app.get('/getCurrenciesForEdit/:id', currenciesController.getCurrenciesForEdit);
app.put('/updateCurrencies/:id', currenciesController.updateCurrencies);
app.delete("/deleteCurrencies/:id", currenciesController.deleteCurrencies);

app.post('/getCurrentAcc', TransactionController.getCurrentAccount);
app.post('/insertTransaction', TransactionController.insertTransaction);
app.post('/getAllTransactions', TransactionController.getAllTransactions);

app.post('/getGoalsWithSession', investmentsGoals.getGoalsBySession);
app.post('/addGoal', investmentsGoals.addGoal);
app.get('/getGoalsForEdit/:id', investmentsGoals.getGoalsForEdit);
app.put('/updateGoal/:id', investmentsGoals.updateGoal);
app.delete("/deleteGoals/:id", investmentsGoals.deleteGoals);

app.post('/getClientforProfile', profileController.getClientforProfile);
app.put('/updateProfile', profileController.updateProfile);
app.post('/updateProfilePicture', profileController.updateProfilePicture);
app.put('/updatePassword', profileController.updatePassword);

app.post('/getCurrentAcc', TransactionController.getCurrentAccount);
app.post('/insertTransaction', TransactionController.insertTransaction);
app.post('/getAllTransactions', TransactionController.getAllTransactions);



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
    console.error('Gabim lidhjen me databaze:', err);
});

app.get('/', (req, res) => {
    if (req.session.username) {
        return res.json({ valid: true, uId: req.session.uId, username: req.session.username, role: req.session.role });
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

app.post('/loginform', async (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?";
    const date = new Date();
    const expireDate = date.setMinutes(date.getMinutes() + 15);

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
                    db.query(`SELECT AccessLevel FROM accesspermissions WHERE UserID = ${result[0].userId}`, (error, results) => {
                        if (error) {
                            console.error("Error querying access permissions:", error);
                            return res.json({ Message: "Error during login", Login: false });
                        }

                        req.session.role = results[0].AccessLevel;
                        req.session.uId = result[0].userId;
                        req.session.username = result[0].username;
                        req.session.name = result[0].name;
                        req.session.lastname = result[0].lastname;
                        req.session.maxAge = +expireDate;
                        return res.json({ Message: "Login successful", Login: true });
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

app.listen(8080, () => {
    console.log("Server is running");
});
