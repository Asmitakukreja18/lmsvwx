import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Checkout from './Pages/Checkout';
import CoursePlayer from "./Pages/CoursePlayer";
import Home from "./Pages/Home";
import StudentRegistration from "./Pages/StudentRegistration";
import Courses from "./Components/Courses";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Shop from "./Pages/CartShop";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import TermsConditions from "./Pages/Terms&Condition";
import RefundPolicy from "./Pages/RefundPolicy";


const App = () => {
return (
<BrowserRouter>
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/courses" element={<Courses />} />
<Route path="/cart" element={<Cart />} />
<Route path="/about" element={<About />} />
<Route path="/contact" element={<Contact />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/login" element={<Login />} />
<Route path="/shop" element={<Shop />} />
<Route path="/register" element={<StudentRegistration />} />
<Route path="/course/:courseId" element={<CoursePlayer />} />
<Route path="/privacy-policy" element={<PrivacyPolicy />} />
<Route path="/terms-and-conditions" element={<TermsConditions />} />
<Route path="/refund-policy" element={<RefundPolicy />} />
</Routes>
<Footer />
</BrowserRouter>
);
};


export default App;