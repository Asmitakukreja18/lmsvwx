const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  

  name: { type: String, required: true },
  email: { type: String, required: true},
  phone: { type: Number, required: true },
  address: { type: String },
  profileImage: { type: String },

  password: { type: String, required: true },
  status: {
    type: String,
    enum: ["active", "inactive", "blocked"],
    default: "active",
  },

  lastLogin: { type: Date },
  enrolledCourses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      enrolledDate: Date,
    },
  ],

  progress: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
      percentage: Number,
      lastActivity: Date,
    },
  ],
}, { timestamps: true });


const StudentModel = mongoose.model('Student', studentSchema)

module.exports = StudentModel;
