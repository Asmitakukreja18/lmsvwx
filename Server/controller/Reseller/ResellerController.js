const bcrypt = require("bcryptjs");
const Reseller = require('../../model/Reseller/ResellerModel');
const jwt = require("jsonwebtoken");


exports.registerReseller = async (req, res) => {
 try {
    const {
      businessName,
      ownerName,
      email,
      phone,
      password,
      gstin,
      pan,
      address,
      kycDocs,
      domain
    } = req.body;

    if (!businessName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await Reseller.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const domainExists = await Reseller.findOne({ domain });
    if (domainExists) {
      return res.status(400).json({ message: "Domain already in use" });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const reseller = await Reseller.create({
      businessName,
      ownerName,
      email,
      phone,
      password: hashedPassword,
      gstin,
      pan,
      address,
      kycDocs,
      domain,
      status: "pending_payment",
      subscription: {
        paymentStatus: "unpaid"
      }
    });

    const safe = reseller.toObject();
    delete safe.password;

    return res.status(201).json({
      success: true,
      message: "Reseller registered successfully",
      reseller: safe
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




exports.loginReseller = async (req, res) => {
  try {
    const { email, password } = req.body;

    const reseller = await Reseller.findOne({ email });
    if (!reseller) {
      return res.status(404).json({ message: "Reseller not found" });
    }

    // Optional status check
    if (reseller.status === "suspended") {
      return res.status(403).json({ message: "Your account is suspended" });
    }
    if (reseller.status === "expired") {
      return res.status(403).json({ message: "Subscription expired" });
    }

    const isMatch = await bcrypt.compare(password.toString(), reseller.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: reseller._id, reseller: true },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("resellerToken", token, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const safe = reseller.toObject();
    delete safe.password;

    return res.json({
      success: true,
      message: "Login successful",
      reseller: safe
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
