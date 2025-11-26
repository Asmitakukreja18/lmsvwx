const express = require("express");
const StudentRouter = require("./router/StudentRouter");
const CourseRouter = require("./router/CourseRouter");
const connectDB = require("./db/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const EnrollmentRouter = require("./router/EnrollmentRouter");
const ResellerRouter = require("./router/Reseller/ResellerRouter");
const orderRouter = require("./router/orderRouter");
const adminRouter = require('./router/admin/adminRouter')
require("dotenv").config();

const server = express();
server.use(cors({
  origin: "http://localhost:3000", 
  credentials: true                
}));

const Port = process.env.PORT || 5000;
connectDB();

server.use(express.json());
server.use(cookieParser());
server.use("/api/students", StudentRouter);

server.use("/course", CourseRouter);
server.use("/enrollment", EnrollmentRouter);
server.use("/reseller", ResellerRouter);
server.use("/order", orderRouter);
server.use('/admin', adminRouter)


server.listen(Port, () => {
  console.log(`server is running on port ${Port}`);
});
