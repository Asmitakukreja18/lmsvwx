const express = require("express");
const { createOrder, confirmOrder } = require("../controller/orderController");
const studentAuth = require("../midddleware/Student/studentAuth");

const orderRouter = express.Router();

orderRouter.post("/create", studentAuth, createOrder);
orderRouter.post("/verify", studentAuth, confirmOrder);

module.exports = orderRouter;
