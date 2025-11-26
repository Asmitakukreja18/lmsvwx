const jwt = require("jsonwebtoken");
const Student = require("../../model/StudentModel");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.studentToken;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const student = await Student.findById(decoded.id);
    if (!student) {
      return res.status(401).json({ message: "Invalid token user" });
    }

    // attach student to request
    req.student = student;
    req.studentId = student._id;

    next();

  } catch (error) {
    res.status(401).json({ message: "Auth failed", error: error.message });
  }
};
