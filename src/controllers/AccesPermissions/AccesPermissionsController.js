const db = require('../../db'); 

const getAccessPermissions = (req, res) => {
    const sql = "SELECT * FROM AccessPermissions";

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
    const sqlUpdate = "UPDATE AccessPermissions SET AccessLevel=? WHERE PermissionID=?";

    db.query(sqlUpdate, [AccessLevel, accessPermissionId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Access permission updated successfully" });
    });
};

module.exports = {
    getAccessPermissions,
    updateAccessPermission
};
