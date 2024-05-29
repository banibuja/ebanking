const db = require('../../db');

const addGoal = (req, res) => {
    const { goalname, GoalAmount, deadline, impact } = req.body;
    const userID = req.session.uId; 

    const sql = "INSERT INTO investmentsgoals (UserID, GoalName, GoalAmount, Deadline, Impact) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [userID, goalname, GoalAmount, deadline, impact], (err, result) => {
        if (err) {
            console.error("Error adding goal:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Goal added successfully");
        return res.json("success");
    });
};

const getGoalsBySession = (req, res) => {
    const userID = req.session.uId; 
    const sql = "SELECT * FROM investmentsgoals WHERE UserID = ?";

    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("fail");
        }
    });
};

const getGoalsForEdit = (req, res) => {
    const goalsID = req.params.id; 
    const sql = "SELECT  UserID, GoalName, GoalAmount, Deadline, Impact FROM investmentsgoals WHERE InvestmentGoalID  = ?";

    db.query(sql, [goalsID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]); 
        } else {
            return res.status(404).json({ message: "Goal not found" });
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
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Goal updated successfully");
        return res.json("success");
    });
};

const deleteGoals = (req, res) => {
    const goaldID = req.params.id;
    const sqlDelete = "DELETE FROM investmentsgoals WHERE InvestmentGoalID = ?";

    db.query(sqlDelete, goaldID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Account deleted successfully" });
    });
};

module.exports = { getGoalsBySession, addGoal, getGoalsForEdit, updateGoal, deleteGoals };
