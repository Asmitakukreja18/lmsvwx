const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({ msg: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({ msg: "Access denied: Admins only" });
    }

    req.admin = decoded;
    next();

  } catch (err) {
    console.error(err);
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
};
