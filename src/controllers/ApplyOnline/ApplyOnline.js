const bcrypt = require('bcrypt');
const db = require('../../db');

const addApply = (req, res) => {
    const { username, name, lastname, email, password, package, gender, birthday, Country, City, Street,  } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ error: 'Error hashing password' });
        } else {
            const hashedPassword = hash;

            const query = `INSERT INTO applyonline (username, name, lastname, email, password, package, gender, birthday, Country, City, Street, Status) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')`;


            const values = [username, name, lastname, email, hashedPassword, package, gender, birthday, Country, City, Street];

            db.query(query, values, (err, result) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    res.status(500).json({ error: 'Error inserting data' });
                } else {
                    console.log('Data inserted successfully:', result);
                    res.status(200).json({ message: 'Data inserted successfully' });
                }
            });
        }
    });
};

const getApply = (req, res) => {
    const query = `SELECT * FROM applyonline`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.status(500).json({ error: 'Error fetching data' });
        } else {
            // console.log('Data retrieved successfully:', results);
            res.status(200).json(results);
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
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Account updated successfully" });
    });
};

const deleteApplicant = (req, res) => {
    const userID = req.params.id;
    const sqlDelete = "DELETE FROM applyonline WHERE userId = ?";

    db.query(sqlDelete, userID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Card deleted successfully" });
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
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ message: "Client not found" });
        }
    });
};

const updateAplicant = (req, res) => {
    const accountId = req.params.id;
    const { username, name, lastname, email, package, birthday, Country, City, Street } = req.body;
    const sqlUpdate = "UPDATE applyonline SET username=?, name=?, lastname=?, email=?, package=?, birthday=?, Country=?, City=?, Street=? WHERE userId=?";



    db.query(sqlUpdate, [username, name, lastname, email, package, birthday, Country, City, Street, accountId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Account updated successfully" });
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
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(data);
    });
};
module.exports = { addApply, getApply, updateStatus, deleteApplicant, getApplicantForEdit, updateAplicant , searchApplicant};
