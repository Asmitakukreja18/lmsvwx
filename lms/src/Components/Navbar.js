import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Store/UserSlice";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";





export default function Navbar() {
  const { user } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  return (
    <div className="navbar-wrapper">
      <div className="container navContainer">
        <div className="logo">
          <h2>40+ Online Courses</h2>
          <p className="sub">VWX B2B (OPC) PVT LTD</p>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/courses" className={({ isActive }) => (isActive ? "active" : "")}>
                Course list
              </NavLink>
            </li>

            <li className="cart-link">
              <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
                Cart
              </NavLink>
              {cart?.length > 0 && <span className="cart-count">{cart.length}</span>}
            </li>

            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
                About Us
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
                Contact
              </NavLink>
            </li>

            {user ? (
              <>
                <li className="user-box">
                  {user.image ? (
                    <img src={user.image} alt="pfp" className="pfp" />
                  ) : (
                    <div className="pfp initials">{getInitials(user.name)}</div>
                  )}
                  <span className="username">{user.name}</span>
                </li>

                <li onClick={handleLogout} className="logout-btn">
                  <FaSignOutAlt size={20} />
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                    Student Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
                    Student Registration
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
