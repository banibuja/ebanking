const { CurrentAccount, SavingsAccount, SavingsHistory } = require('../../Models/Transactions/SavingsAccount');
const jwt = require('jsonwebtoken');

// Helper to get the userID from JWT token
const getUserIdFromToken = (req, res) => {
    const token = req.cookies.authToken;
    const secretKey = process.env.SECRET;
    try {
        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken.userId;
    } catch (error) {
        res.status(401).json({ error: "Not logged in" }).end();
        return null;
    }
};

// Get all current accounts for a user (findAll)
const findAllCurrentAccounts = async (req, res) => {
    const userID = getUserIdFromToken(req, res);
    if (!userID) return;

    try {
        const accounts = await CurrentAccount.findAll({ where: { UserID: userID } });
        if (accounts.length > 0) {
            res.status(200).json(accounts).end();
        } else {
            res.status(404).json({ message: "No accounts found" }).end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Database error' }).end();
    }
};

// Get all savings accounts for a user (findAll)
const findAllSavingsAccounts = async (req, res) => {
    const userID = getUserIdFromToken(req, res);
    if (!userID) return;

    try {
        const savingsAccounts = await SavingsAccount.findAll({ where: { UserID: userID } });
        if (savingsAccounts.length > 0) {
            res.status(200).json(savingsAccounts).end();
        } else {
            res.status(404).json({ message: "No savings accounts found" }).end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Database error' }).end();
    }
};

// Create a new transaction (create)
const createTransaction = async (req, res) => {
    const { SenderAccID, TransactionAmount, ReceiverAccID } = req.body;
    
    if (!SenderAccID || !TransactionAmount || !ReceiverAccID) {
        return res.status(400).json({ error: "Missing parameters" }).end();
    }

    try {
        const senderAccount = await CurrentAccount.findByPk(SenderAccID);
        if (!senderAccount) {
            return res.status(404).json({ error: "Sender account not found" }).end();
        }
        if (senderAccount.Balance < TransactionAmount) {
            return res.status(400).json({ error: "Insufficient balance" }).end();
        }

        const receiverAccount = await SavingsAccount.findByPk(ReceiverAccID);
        if (!receiverAccount) {
            return res.status(404).json({ error: "Receiver account not found" }).end();
        }

        // Update balances
        senderAccount.Balance -= TransactionAmount;
        await senderAccount.save();

        receiverAccount.Balance += TransactionAmount;
        await receiverAccount.save();

        // Create transaction history
        await SavingsHistory.create({
            CurrentAccountID: SenderAccID,
            FlexSaveAccountID: ReceiverAccID,
            TransactionAmount
        });

        res.status(200).json({ message: 'Transaction successful' }).end();
    } catch (error) {
        res.status(500).json({ error: 'Database error' }).end();
    }
};

// Get all transaction history for a user's current account (findPK)
const findAllHistoryByCurrentAccount = async (req, res) => {
    const userID = getUserIdFromToken(req, res);
    if (!userID) return;

    try {
        const account = await CurrentAccount.findOne({ where: { UserID: userID } });
        if (!account) {
            return res.status(404).json({ message: "No account found" }).end();
        }

        const transactions = await SavingsHistory.findAll({ where: { CurrentAccountID: account.CurrentAccountID } });
        if (transactions.length > 0) {
            res.status(200).json(transactions).end();
        } else {
            res.status(404).json({ message: "No transactions found" }).end();
        }
    } catch (error) {
        res.status(500).json({ error: 'Database error' }).end();
    }
};

module.exports = { findAllCurrentAccounts, findAllSavingsAccounts, createTransaction, findAllHistoryByCurrentAccount };
