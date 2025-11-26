const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  enrollmentDate: {
    type: Date,
    default: Date.now
  },

  accessStatus: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  },

  progress: {
    watched: { type: Boolean, default: false },
    watchedAt: Date
  },

  certificate: {
    number: String,
    issueDate: Date
  }

}, { timestamps: true });

module.exports = mongoose.model("Enrollment", enrollmentSchema);
