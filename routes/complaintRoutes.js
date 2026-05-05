const express = require("express");
const router = express.Router();

const {
    createComplaint,
    getAllComplaints,
    getUserComplaints
} = require("../controllers/complaintController");

const verifyToken = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

// CREATE complaint
router.post("/create", verifyToken, createComplaint);

// GET ALL complaints (ADMIN)
router.get("/", getAllComplaints);

// GET USER complaints
router.get("/my", verifyToken, getUserComplaints);

module.exports = router;