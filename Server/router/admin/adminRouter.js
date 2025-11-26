const express = require("express");
const { registerAdmin, loginAdmin, logoutAdmin  } = require("../../controller/admin/adminController");

const adminRouter = express.Router();


adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/logout", logoutAdmin);

module.exports = adminRouter;
