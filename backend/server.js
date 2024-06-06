const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const defineRoutes = require('./controllers/AllControllers');
const db = require('./db'); 



const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(bodyParser.json());

defineRoutes(app);


app.get('/', (req, res) => {
    const token = req.cookies.authToken;
    
    if (!token) {
      return res.status(204).json({ message: 'Token not provided' });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.json({ valid: false });
        } else {
            return res.json({ valid: true, uId: decoded.uId, username: decoded.username, role: decoded.role });
        }
      });

});

app.get('/logout', (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
    const lastLogin = new Date()
    db.query("UPDATE users SET lastLogin = ? WHERE userId = ?", [lastLogin, userID], (updateErr, updateResult) => {
        if (updateErr) {
            console.error("Error updating last login timestamp:", updateErr);
            return res.json({ Message: "Error during login", Login: false });
        }
    });
    console.log('loged out');
    res.clearCookie('connect.sid');
    res.clearCookie('authToken').send('Logged out successfully');
} catch (error) {
        res.status(401).send("not logged in").end();
      }
});






app.listen(8080, () => {
    console.log("Server is running");
});
