const mongoose = require("mongoose");

const resellerCourseSchema = new mongoose.Schema({

  resellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reseller",
    required: true,
    index: true
  },

  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
    index: true
  },

  sellingPrice: { 
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }

}, { timestamps: true });

resellerCourseSchema.index({ resellerId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model("ResellerCourse", resellerCourseSchema);
