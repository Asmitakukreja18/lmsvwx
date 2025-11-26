const ResellerCourse = require("../model/ResellerCourse");
const Course = require("../model/CourseModel");

exports.activateCourse = async (req, res) => {
  try {
    const resellerId = req.resellerId;
    const { courseId, sellingPrice } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const record = await ResellerCourse.findOneAndUpdate(
      { resellerId, courseId },
      { sellingPrice, status: "active" },
      { new: true, upsert: true }
    );

    res.json({
      message: "Course activated successfully",
      data: record
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updatePrice = async (req, res) => {
  try {
    const resellerId = req.resellerId;
    const { id } = req.params;
    const { sellingPrice } = req.body;

    const updated = await ResellerCourse.findOneAndUpdate(
      { _id: id, resellerId },
      { sellingPrice },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Record not found" });

    res.json({
      message: "Price updated",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.setCourseStatus = async (req, res) => {
  try {
    const resellerId = req.resellerId;
    const { id } = req.params;
    const { status } = req.body;

    const updated = await ResellerCourse.findOneAndUpdate(
      { _id: id, resellerId },
      { status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Record not found" });

    res.json({ 
      message: "Status updated", 
      data: updated 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMyCourses = async (req, res) => {
  try {
    const resellerId = req.resellerId;

    const list = await ResellerCourse.find({ resellerId })
      .populate("courseId")
      .sort({ createdAt: -1 });

    res.json(list);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
