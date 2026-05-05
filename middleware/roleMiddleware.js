const checkRole = (allowedRole) => {
    return (req, res, next) => {
        // Ensure req.user exists (from verifyToken middleware)
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Check if role matches
        if (req.user.role !== allowedRole) {
            return res.status(403).json({ message: "Forbidden: You don't have the required role" });
        }

        next();
    };
};

module.exports = checkRole;
