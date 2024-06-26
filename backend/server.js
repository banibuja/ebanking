const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const defineRoutes = require('./controllers/AllControllers');
const db = require('./db'); 
const axios = require("axios");

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

    const userAgent = req.headers['user-agent'];
    
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.json({ valid: false });
        } else {
            return res.json({ valid: true, uId: decoded.uId, username: decoded.username, role: decoded.role, userAgent });
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
        
        console.log('Logged out');
        res.clearCookie('connect.sid');
        res.clearCookie('authToken').send('Logged out successfully');
    } catch (error) {
        res.status(401).send("Not logged in").end();
    }
});

app.get('/getPublicIP', async (req, res) => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        res.json({ ip: response.data.ip });
    } catch (error) {
        console.error('Failed to fetch public IP address:', error);
        res.status(500).json({ error: 'Failed to fetch public IP address' });
    }
});





app.post('/refresh_token', async (req, res) => {
    // const refreshToken = req.session.refreshToken;

    // jwt.verify(refreshToken, 'refresh_token_secret', (err, decoded) => {
    //     if (err) {
    //         return res.sendStatus(403); // Forbidden
    //     }
    //     const accessToken = jwt.sign({ userId: decoded.userId }, 'access_token_secret', { expiresIn: '15m' });
    //     res.json({ accessToken });
    // });
});


app.listen(8080, () => {
    console.log("Server is running");
});
