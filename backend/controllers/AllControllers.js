// AllControllers.js
const LoginController = require('./Login/LoginController');
const clientController = require('./Client/ClientController');
const applyOnlineController = require('./ApplyOnline/ApplyOnline');
const accessPermissionsController = require('./AccesPermissions/AccesPermissionsController');
const currentAccountController = require('./Accounts/CurrentAccount/CurrentAccounts');
const savingsAccountController = require('./Accounts/SavingsAccount/SavingsAccount');
const cardsController = require('./Cards/ClientCards');
const SessionController = require('./Session/sessioncontroller');
const TransactionController = require('./Transaction/Transaction');
const investmentsGoals = require('./Investments/InvestmentsGoals');
const currenciesController = require('./Currencies/Currencies');
const profileController = require('./Profile/Profile');
const loansController = require('./Loans/Loans');
const contactusController = require('./Contact/sendEmailContactForm');
const saveTransactionController = require('./Transaction/SaveTransaction');
const HomeController = require('./Add-Home-page/Add-InfoSection');
const CaruselController = require('./Add-Home-page/AddCarusel');
const AboutUSController = require('./AboutUs/AddAbouUs');
const TeamController = require('./AboutUs/Team');
const PaymentController =require('./Payment/PaymentController');
const SupportController=require('./Support/SupportController');
const LogsAdmin = require('./Logs/LogsAdmin')


const defineRoutes = (app) => {
   

  

    app.post('/loginform',                  LoginController.login);
    app.post('/sendMessage',                SupportController.sendMessage);
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
    


    
    app.post('/insertLog',                  LogsAdmin.insertLog);
    app.get('/getLogs',                     LogsAdmin.getLogs);

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
    
    
    
    
    app.post('/getClientforProfile',        profileController.getClientforProfile);
    app.put('/updateProfile',               profileController.updateProfile);
    app.post('/updateProfilePicture',       profileController.updateProfilePicture);
    app.put('/updatePassword',              profileController.updatePassword);
    
    app.post('/getCurrentAcc',              TransactionController.getCurrentAccount);
    app.post('/insertTransaction',          TransactionController.insertTransaction);
    app.post('/getAllTransactions',         TransactionController.getAllTransactions);
    
    app.post('/getAllnterTransactions',     TransactionController.getAllnterTransactions);
    
    app.post('/getAllLoans',                loansController.getAllLoans);
    app.get('/getAccountNumber',            loansController.getAccountNumber);
    app.post('/applyLoan',                  loansController.applyLoan);
    app.post('/addLoan',                    loansController.addLoan);
    app.delete("/deleteLoan/:id",           loansController.deleteLoan);
    app.get('/editLoans/:id',               loansController.getLoanForEdit);
    app.put('/updateLoan/:id',              loansController.updateLoan);
    app.put('/updateStatusLoans/:id',       loansController.updateStatusLoans);
    
    app.post('/getAllLoansForClient',       loansController.getAllLoansForClient);

    app.get('/getAllBills',                PaymentController.getAllBills);
    app.post('/AddBillForm',                PaymentController.AddBillForm);
    app.delete("/deleteBills/:id",          PaymentController.deleteBills);
    app.put('/updateBills/:id',            PaymentController.updateBills);
    app.get('/getNrPersonals',               PaymentController.getNrPersonal);
    
    app.get('/getAllBillsForStaff',                PaymentController.getAllBillsForStaff);



    // app.post('/AddTeam',                  AddTeamControllr.AddTeamee);
    // app.post('/AddPlayer',                  AddTeamControllr.AddPlayer);
    // app.post('/getPlayers',                  AddTeamControllr.getPlayers);
    // app.get('/getTeam',                  AddTeamControllr.getTeam);
    // app.delete("/deletePlayers/:id",              AddTeamControllr.deletePlayers);
    // app.get('/getForEdit/:id',                  AddTeamControllr.getForEdit);
    // app.put('/updatePlayers/:id',              AddTeamControllr.updatePlayers);


    // app.get('/getPlanet',                  AddPlanet.getPlanet);
    // app.post('/AddPlanet',                  AddPlanet.AddPlanet);
    // app.put("/deleteSatelite/:id",              AddPlanet.deleteSatelite);
    // app.post('/AddSatellite',                  AddPlanet.AddSatellite);
    // app.post('/getSatellite',                  AddPlanet.getSatellite);


};

module.exports = defineRoutes;
