const express = require('express')
const {login, signup, logoutStudent} = require('../controller/StudentController')




const router = express.Router()
console.log("StudentRouter loaded");

router
.post('/login', login)
.post('/signup',signup)
.get('/logout', logoutStudent);


module.exports = router