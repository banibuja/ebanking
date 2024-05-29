
const sessionTimeRemaining = (req, res) => {
    if (req.session && req.session.username) {
        const now = new Date().getTime();
        const expireTime = req.session.maxAge;
        if (now > expireTime) {
            req.session.expired = true;
            return res.json({ timeRemaining: 0 });
        } else {
            const timeRemaining = Math.round((expireTime - now) / 1000);
            return res.json({ timeRemaining });
        }
    } else {
        return res.status(401).json({ error: "User session not found" });
    }
};

const resetSession = (req, res) => {
    
    if (req.session) {
        const date = new Date();
        expireDate = date.setMinutes(date.getMinutes() + 15)
        req.session.touch(); 
        req.session.maxAge = +expireDate;
        res.json({ success: true });
    } else {
        res.status(401).json({ error: "User session not found" });
    }
};

module.exports = { sessionTimeRemaining, resetSession };

