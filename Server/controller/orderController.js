const Order = require("../model/orderModel");
const Enrollment = require("../model/EnrollmentModel");
const Course = require("../model/CourseModel");
const Student = require('../model/StudentModel')

exports.createOrder = async (req, res) => {
  try {
    const studentId = req.studentId;  
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    
    const existingEnroll = await Enrollment.findOne({ studentId, courseId });
    if (existingEnroll) {
      return res.status(400).json({ message: "Already purchased" });
    }

    const order = await Order.create({
      studentId,
      courseId,
      amount: course.price,   
      paymentStatus: "pending"
    });

    res.json({
      message: "Order created",
      order
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.confirmOrder = async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentId,
        paymentStatus: "paid"
      },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Enroll student
  const enrollment = await Enrollment.create({
      studentId: order.studentId,
      courseId: order.courseId
    });

    // OPTIONAL: Update student table
    await Student.findByIdAndUpdate(order.studentId, {
      $push: {
        enrolledCourses: {
          courseId: order.courseId,
          enrolledDate: new Date()
        }
      }
    });

    res.json({
      message: "Payment successful & enrolled",
      order,
      enrollment
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
