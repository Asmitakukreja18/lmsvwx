const express = require('express');
const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse
} = require('../controller/CourseController');
const adminAuth = require("../midddleware/admin/adminAuth")

const courseRouter = express.Router();


courseRouter
.post('/createCourse',adminAuth, createCourse)
.get('/allCourse',adminAuth, getAllCourses)
.get('/:id', adminAuth,getCourse)
.put('/update/:id', adminAuth, updateCourse)
.delete('/delete/:id', adminAuth, deleteCourse);

module.exports = courseRouter;
