const Student = require("../model/StudentModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password.toString(), student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: student._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    
    res.cookie("studentToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000  
    });

    return res.json({
      message: "Login successful",
      student
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};







const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const exists = await Student.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

   
    const student = await Student.create({
      name: `${firstName} ${lastName}`,
      email,
      phone: 1234567890,       
      password: hashedPassword,
      address: "",           
    });
 console.log("New student created:", student);
    res.status(201).json({
      message: "Student registered successfully",
      student,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const logoutStudent = async (req, res) => {
  try {
   
    res.clearCookie("studentToken", {
      httpOnly: true,
      secure: true,     
      sameSite: "none",
    });

    return res.json({ msg: "Logout successful" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { login, signup, logoutStudent };
