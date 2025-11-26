const Course = require('../model/CourseModel');


exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      message: "Course created successfully",
      course
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({
      message: "Course updated successfully",
      course
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.myCourses = async (req, res) => {
  const studentId = req.user.id;

  const list = await Enrollment.find({ studentId })
    .populate("courseId");

  res.json(list);
};
