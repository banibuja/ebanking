const db = require('../../db');

const jwt = require('jsonwebtoken')
const addGoal = (req, res) => {
    const { goalname, GoalAmount, deadline, impact } = req.body;
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);
   
    const userID = decodedToken.userId; 

    const sql = "INSERT INTO investmentsgoals (UserID, GoalName, GoalAmount, Deadline, Impact) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [userID, goalname, GoalAmount, deadline, impact], (err, result) => {
        if (err) {
            console.error("Error adding goal:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Goal added successfully");
        return res.status(200).json("success").end();
    });
} catch (error) {
    console.error('getAllnterTransactions verification failed:', error);
}
};

const getGoalsBySession = (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);
   
    const userID = decodedToken.userId; 
    const sql = "SELECT * FROM investmentsgoals WHERE UserID = ?";

    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data).end();
        } else {
            return res.status(204).json("fail").end();
        }
    });} catch (error) {
        console.error('getAllnterTransactions verification failed:', error);
    }
};

const getGoalsForEdit = (req, res) => {
    const goalsID = req.params.id; 
    const sql = "SELECT  UserID, GoalName, GoalAmount, Deadline, Impact FROM investmentsgoals WHERE InvestmentGoalID  = ?";

    db.query(sql, [goalsID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end(); 
        } else {
            return res.status(204).json({ message: "Goal not found" }).end();
        }
    });
};

const updateGoal = (req, res) => {
    const { GoalName, GoalAmount, Deadline, Impact } = req.body;
    const goalsID = req.params.id; 

    const sql = "UPDATE investmentsgoals SET GoalName = ?, GoalAmount = ?, Deadline = ?, Impact = ? WHERE InvestmentGoalID = ?";
    db.query(sql, [GoalName, GoalAmount, Deadline, Impact, goalsID], (err, result) => {
        if (err) {
            console.error("Error updating goal:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Goal updated successfully");
        return res.status(200).json("success").end();
    });
};

const deleteGoals = (req, res) => {
    const goaldID = req.params.id;
    const sqlDelete = "DELETE FROM investmentsgoals WHERE InvestmentGoalID = ?";

    db.query(sqlDelete, goaldID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Account deleted successfully" }).end();
    });
};

module.exports = { getGoalsBySession, addGoal, getGoalsForEdit, updateGoal, deleteGoals };
