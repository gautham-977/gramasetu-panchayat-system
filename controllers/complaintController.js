const Complaint = require('../models/Complaint');

// CREATE complaint
const createComplaint = async (req, res) => {
    try {
        const { description, category, priority } = req.body;

        const newComplaint = new Complaint({
            complaintId: "C" + Math.floor(Math.random() * 10000), // temporary
            userId: req.user.id,
            description,
            category,
            priority,
            status: "Pending"
        });

        await newComplaint.save();

        res.status(201).json({
            message: "Complaint filed successfully",
            complaintId: newComplaint.complaintId
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET all complaints
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET user complaints
const getUserComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({ userId }).populate('userId', 'name');
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const complaint = await Complaint.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        res.json({
            message: "Status updated successfully",
            complaint
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createComplaint,
    getAllComplaints,
    getUserComplaints,
    updateComplaintStatus
};