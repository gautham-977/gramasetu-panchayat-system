const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    // Read token from Authorization header
    const token = req.header("Authorization");

    // Check if token exists
    if (!token) {
        return res.status(403).json({ message: "Access denied, no token provided" });
    }

    try {
        // Remove "Bearer " if present
        const bearerToken = token.startsWith("Bearer ") ? token.slice(7) : token;

        // Verify token
        const verified = jwt.verify(bearerToken, process.env.JWT_SECRET || "default_secret");
        
        // Attach user data to req.user
        req.user = verified;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyToken;
