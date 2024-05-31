const db = require('../../db');

const insertAboutUs = (req, res) => {
    const { Tittle, Info } = req.body;

    const sql = "INSERT INTO AboutUs (Tittle, Info) VALUES (?, ?)";
    db.query(sql, [Tittle, Info], (err, result) => {
        if (err) {
            console.error("Error adding AboutUs:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("AboutUs added successfully");
        return res.json("success");
    });
};


const getAboutUs = (req, res) => {
    const sql = "SELECT * FROM AboutUs";

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json([]);
        }
    });
};

const getAboutUsEdit = (req, res) =>{
    const AboutUsId = req.params.id;
    const sql = "SELECT * FROM AboutUs where AboutUsId=?";
    db.query(sql, [AboutUsId], (err, data) => {
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
const updateAboutUs =(req, res) => {
    const {Tittle,Info} = req.body;
    const AboutUsId = req.params.id;
    sql="UPDATE AboutUs SET Tittle = ? ,Info = ? where AboutUsId = ?";
    db.query(sql, [Tittle, Info, AboutUsId], (err, result) => {
        if (err) {
            console.error("Error updating AbouUs:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("AboutUs updated successfully");
        return res.json("success");
    });
}
const deleteAboutUs = (req, res) => {
    const AboutUsId = req.params.id;
    const sql = "DELETE FROM AboutUs WHERE AboutUsId = ?";
    db.query(sql, [AboutUsId], (err, result) => {
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
module.exports = { insertAboutUs,getAboutUs,getAboutUsEdit,updateAboutUs,deleteAboutUs};
