const mongoose = require("mongoose");
const generateComplaintId = require("../utils/generateComplaintId");

const complaintSchema = new mongoose.Schema({

    complaintId: {
        type: String,
        unique: true,   
        default: () => generateComplaintId()
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Low"
    },

    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"],
        default: "Pending"
    },

    assignedDepartment: {
        type: String,
        default: "Not Assigned"
    },

    expectedDate: {
        type: Date
    }

}, { timestamps: true });

module.exports = mongoose.model("Complaint", complaintSchema);