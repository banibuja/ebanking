


const db = require('../../db'); 

const getAllPermissions = (req, res) => {

    const sql = `
    SELECT a.*, u.username, u.name, u.lastname
    FROM accesspermissions a 
    INNER JOIN users u ON a.UserID = u.userId 
    
`;


    db.query(sql, (err, data) => {
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

const updateAccessPermission = (req, res) => {
    const accessPermissionId = req.params.id;
    const { AccessLevel } = req.body;
    const sqlUpdate = "UPDATE accesspermissions SET AccessLevel=? WHERE PermissionID=?";

    db.query(sqlUpdate, [AccessLevel, accessPermissionId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Access permission updated successfully" });
    });
};



const searchAccessPermissionss = (req, res) => {
    const { username } = req.body;
    const sql = `
    SELECT u.*, a.AccessLevel
    FROM users u 
    INNER JOIN accesspermissions a ON a.UserID = u.userId 
    WHERE u.username = ?
`;
    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(data);
    });
};



const getAccesForEdit = (req, res) => {
    const accessID = req.params.id;
    const sql = `
    SELECT u.*, a.AccessLevel
    FROM users u 
    INNER JOIN accesspermissions a ON a.UserID = u.userId 
    WHERE a.PermissionID =?
    
`;
    db.query(sql, [accessID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ message: "Access permission not found" });
        }
    });
};




module.exports = {
    getAllPermissions,
    updateAccessPermission,
    searchAccessPermissionss,
    getAccesForEdit
};
