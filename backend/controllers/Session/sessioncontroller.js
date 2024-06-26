const jwt = require('jsonwebtoken');

const sessionTimeRemaining = (req, res) => {
    if (req.cookies.authToken) {
        try {
            const token = req.cookies.authToken; 
            const secretKey = process.env.SECRET; 
            const decodedToken = jwt.verify(token, secretKey);
            let now = parseInt(new Date().getTime().toString().slice(0, 10));
            const expireTime = decodedToken.exp;
            
            const minSessionDuration = 900; 
            
            if (now > expireTime) {
                res.status(401).send("expired token").end();
            } else {
                let timeRemaining = Math.round((expireTime - now) / 1000);
                if (timeRemaining < minSessionDuration) {
                    timeRemaining = minSessionDuration;
                }
                return res.status(200).json({ timeRemaining }).end();
            }
        } catch (error) {
            res.status(401).send("not logged in").end();
        }
    } else {
        res.status(401).send("not logged in").end();
    }
};

module.exports = { sessionTimeRemaining };
