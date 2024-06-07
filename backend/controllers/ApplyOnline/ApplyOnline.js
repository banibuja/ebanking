const bcrypt = require('bcrypt');
const db = require('../../db');
const {  generateRandomPassword } = require('../Client/helpers');


const addApply = async (req, res) => {
    const { username, name, lastname, email, package, gender, birthday, Country, City, Street, frontPhoto, backPhoto } = req.body;
    
  
        const query = `INSERT INTO applyonline (username, name, lastname, email, package, gender, birthday, Country, City, Street, frontPhoto, backPhoto, Status) 
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`;

        const values = [username, name, lastname, email, package, gender, birthday, Country, City, Street, frontPhoto, backPhoto];

        db.query(query, values, (err) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'Error inserting data' }).end();
            }

            res.status(200).json({ message: 'Data inserted successfully' }).end();
        });
    }

const getApply = (req, res) => {
    const query = `SELECT * FROM applyonline`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data' }).end();
        } else {
            res.status(200).json(results).end();
        }
    });
};

const updateStatus = (req, res) => {
    const accountId = req.params.id;
    const { Status } = req.body;
    const sqlUpdate = "UPDATE applyonline SET Status=?  WHERE userId=?";

    db.query(sqlUpdate, [Status, accountId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Account updated successfully" }).end();
    });
};

const deleteApplicant = (req, res) => {
    const userID = req.params.id;
    const sqlDelete = "DELETE FROM applyonline WHERE userId = ?";

    db.query(sqlDelete, userID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Card deleted successfully" }).end();
    });
};

const getApplicantForEdit = (req, res) => {
    const clientID = req.params.id;
    const sql = `
        SELECT *
        FROM applyonline u
         
        WHERE userId = ?
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

const updateAplicant = (req, res) => {
    const accountId = req.params.id;
    const { username, name, lastname, email, package, birthday, Country, City, Street } = req.body;
    const sqlUpdate = "UPDATE applyonline SET username=?, name=?, lastname=?, email=?, package=?, birthday=?, Country=?, City=?, Street=? WHERE userId= ?";

    db.query(sqlUpdate, [username, name, lastname, email, package, birthday, Country, City, Street, accountId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Account updated successfully" }).end();
    });
};



const searchApplicant = (req, res) => {
    const { username } = req.body;
    const sql = `
    SELECT *
    FROM applyonline 
    WHERE username = ?
`;
    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json(data).end();
    });
};
module.exports = { addApply, getApply, updateStatus, deleteApplicant, getApplicantForEdit, updateAplicant , searchApplicant};
