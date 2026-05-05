const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const User = require("./models/User");
const Complaint = require("./models/Complaint");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");
const checkRole = require("./middleware/roleMiddleware");

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("GramaSetu Backend Running");
});

// Protected Example: Only Admin can see this
app.get("/api/admin/dashboard", verifyToken, checkRole("Admin"), (req, res) => {
    res.json({ message: "Welcome Admin! You can manage the system here." });
});

// Protected Example: Official or Admin
app.get("/api/official/dashboard", verifyToken, (req, res) => {
    // Basic check for either role if needed, or just specific roles
    if (req.user.role === "Admin" || req.user.role === "Official") {
        res.json({ message: `Welcome ${req.user.role}! You can view complaints.` });
    } else {
        res.status(403).json({ message: "Forbidden" });
    }
});

// Extra added route to test user insertion into the database
app.get("/test-user", async (req, res) => {

    try {

        const newUser = new User({
            name: "Test User",
            password: "123456",
            role: "User"
        });

        await newUser.save();

        res.send("Test user inserted successfully");

    } catch (error) {

        console.error(error);
        res.status(500).send("Error inserting user");

    }

});

// Extra added route to test complaint insertion into the database

app.get("/test-complaint", async (req, res) => {

    try {

        const user = await User.findOne();

        const complaint = new Complaint({
            userId: user._id,
            description: "Street light not working",
            category: "Electricity",
            priority: "High",
            assignedDepartment: "KSEB"
        });

        await complaint.save();

        res.send("Test complaint inserted successfully");

    } catch (error) {

        console.error(error);
        res.status(500).send("Error inserting complaint");

    }

});

// API Routes
// Import your routes
const complaintRoutes = require("./routes/complaintRoutes");

// Use your routes
app.use("/api/complaints", complaintRoutes);


// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});