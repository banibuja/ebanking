const sessionTimeRemaining = (req, res) => {
    if (req.session && req.session.username) {
        const now = new Date().getTime();
        const expireTime = req.session.cookie.expires ? new Date(req.session.cookie.expires).getTime() : now;
        if (now > expireTime) {
            req.session.destroy(err => {
                if (err) {
                    return res.status(500).json({ error: "Failed to destroy session" });
                }
                return res.json({ timeRemaining: 0 });
            });
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
        req.session.cookie.maxAge = 15 * 60 * 1000; 
        res.json({ success: true });
    } else {
        res.status(401).json({ error: "User session not found" });
    }
};

module.exports = { sessionTimeRemaining, resetSession };
