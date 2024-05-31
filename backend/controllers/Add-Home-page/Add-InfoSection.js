const db = require('../../db');

const insertInfoSection = (req, res) => {
    const { Info } = req.body;

    const sql = "INSERT INTO InfoSection (Info) VALUES (?)";
    db.query(sql, [Info], (err, result) => {
        if (err) {
            console.error("Error adding goal:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Goal added successfully");
        return res.json("success");
    });
};

const getInfoSection = (req, res) => {
    const sql = "SELECT * FROM InfoSection";

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
const getInfoForEdit = (req, res) =>{
    const InfoSectionId = req.params.id;
    const sql = "SELECT * FROM InfoSection where InfoSectionId=?";
    db.query(sql, [InfoSectionId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ message: "Carusel not found" });
        }
    });
}
const updateInfo =(req, res) => {
    const {Info} = req.body;
    const InfoSectionId = req.params.id;
    sql="UPDATE InfoSection SET Info = ? where InfoSectionId = ?";
    db.query(sql, [Info, InfoSectionId], (err, result) => {
        if (err) {
            console.error("Error updating Infosection:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Infosection updated successfully");
        return res.json("success");
    });
}
const deleteInfo = (req, res) => {
    const CaruselId = req.params.id;
    const sql = "DELETE FROM InfoSection WHERE InfoSectionId = ?";
    db.query(sql, [CaruselId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (result.affectedRows > 0) {
            return res.json('success');
        } else {
            return res.status(404).json({ message: "Carousel item not found" });
        }
    });
};
module.exports = { insertInfoSection,getInfoSection,getInfoForEdit,updateInfo,deleteInfo };
