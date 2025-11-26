const Admin = require("../../model/admin/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.registerAdmin = async (req, res) => {
  try {
    const {  email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
    
      email,
      password: hashedPassword,
      role : "admin"
    });

    res.status(201).json({
      msg: "Admin registered successfully",
      admin: {
        id: admin._id,
    
        email: admin.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};




exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true,        
      sameSite: "none",  
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return res.json({
      msg: "Login successful",
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};


exports.logoutAdmin = async (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: true,     // ❗ set false in localhost
      sameSite: "none", // ❗ set "lax" in localhost
    });

    return res.json({ msg: "Logout successful" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};
