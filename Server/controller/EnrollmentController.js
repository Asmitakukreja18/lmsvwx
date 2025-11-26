const Enrollment = require('../model/EnrollmentModel');




exports.enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;


    const already = await Enrollment.findOne({ studentId, courseId });
    if (already) {
      return res.status(400).json({ message: "Already enrolled" });
    }

    const enrollment = await Enrollment.create({
      studentId,
      courseId
    });

    res.json({
      message: "Student enrolled successfully",
      enrollment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.markWatched = async (req, res) => {
  try {
    const { id } = req.params; 

    const enrollment = await Enrollment.findByIdAndUpdate(
      id,
      { 
        "progress.watched": true,
        "progress.watchedAt": new Date(),
        accessStatus: "completed"  
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.json({
      message: "Video marked as watched",
      enrollment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate("courseId");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getStudentEnrollments = async (req, res) => {
  try {
    const studentId = req.studentId; // from middleware

    const enrollments = await Enrollment.find({ studentId })
      .populate("courseId"); // fetch course details

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({
        message: "No enrollments found for this student"
      });
    }

    res.json(enrollments);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.generateCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificateNumber = "CERT-" + Math.floor(Math.random() * 1000000);

    const enrollment = await Enrollment.findByIdAndUpdate(
      id,
      {
        certificate: {
          number: certificateNumber,
          issueDate: new Date()
        },
        accessStatus: "completed"
      },
      { new: true }
    );

    res.json({
      message: "Certificate generated",
      enrollment
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
