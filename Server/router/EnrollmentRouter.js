const express = require('express');
const {
  enrollStudent,
  markWatched,
  getEnrollments,
getStudentEnrollments,
  generateCertificate
} = require('../controller/EnrollmentController');

const studentAuth = require('../midddleware/Student/studentAuth'); 
const adminAuth = require("../midddleware/admin/adminAuth")

const enrollmentRouter = express.Router();

enrollmentRouter.post('/enroll',  studentAuth, enrollStudent);
enrollmentRouter.put('/watched/:id', studentAuth, markWatched);
enrollmentRouter.get('/enroll',  adminAuth, getEnrollments);
enrollmentRouter.get('/student',  studentAuth, getStudentEnrollments);
enrollmentRouter.post('/certificate/:id',  studentAuth, generateCertificate);

module.exports = enrollmentRouter;
