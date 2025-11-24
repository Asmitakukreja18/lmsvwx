// Pages/Checkout.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPurchasedCourse } from '../Store/UserSlice';
import { clearCart } from '../Store/CartSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Redux se cart aur totalPrice le rahe hain
  const { items: cart, totalPrice } = useSelector((state) => state.cart);
  const singleCourse = location.state?.course;

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [upiProvider, setUpiProvider] = useState("@ybl");

  // Final amount decide karo
  const finalPrice = singleCourse ? singleCourse.price : totalPrice;

  // Payment complete hone pe
  const handlePayment = (e) => {
    e.preventDefault();

    // Success message
    alert("Payment Successful! Course(s) Unlocked!");

    // Purchased courses user ko de do
    if (singleCourse) {
      dispatch(addPurchasedCourse(singleCourse.id));
    } else {
      cart.forEach(item => dispatch(addPurchasedCourse(item.id)));
    }

    // Cart khali kar do
    dispatch(clearCart());

    // Courses page pe bhej do
    navigate('/courses', { replace: true });
  };

  return (
    <div className="checkout-container">
      <div className="left-section">
        <h1>Checkout</h1>
        <h2>Billing details</h2>
        <form onSubmit={handlePayment}>
          <div className="form-row">
            <div>
              <label>First name *</label>
              <input type="text" required />
            </div>
            <div>
              <label>Last name *</label>
              <input type="text" required />
            </div>
          </div>

          <label>Company name (optional)</label>
          <input type="text" />

          <label>Country / Region *</label>
          <input type="text" value="India" readOnly />

          <label>Street address *</label>
          <input type="text" placeholder="House number and street name" required />
          <input type="text" placeholder="Apartment, suite, etc. (optional)" />

          <label>Town / City *</label>
          <input type="text" required />

          <label>State *</label>
          <select required>
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Uttar Pradesh</option>
            <option>Gujarat</option>
            <option>West Bengal</option>
            <option>Karnataka</option>
            <option>Tamil Nadu</option>
            <option>Rajasthan</option>
          </select>

          <label>PIN Code *</label>
          <input type="text" required />

          <label>Phone *</label>
          <input type="text" required />

          <label>Email address *</label>
          <input type="email" required />
        </form>

        <div className="create-account">
          <input type="checkbox" id="createAcc" />
          <label htmlFor="createAcc">Create an account?</label>
        </div>

        <h3>Additional information</h3>
        <label>Order notes (optional)</label>
        <textarea
          placeholder="Notes about your order, e.g. special notes for delivery."
          rows="3"
        ></textarea>

        <h3>Order Details</h3>
        <div className="order-details">
          {singleCourse ? (
            <div className="order-item">
              <div className="order-item-info">
                <img src={singleCourse.image} alt={singleCourse.title} />
                <p>{singleCourse.title}</p>
              </div>
              <span className="order-item-price">₹{singleCourse.price}.00</span>
            </div>
          ) : cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div className="order-item" key={item.id}>
                <div className="order-item-info">
                  <img src={item.image} alt={item.title} />
                  <p>{item.title} × {item.quantity || 1}</p>
                </div>
                <span className="order-item-price">
                  ₹{item.price * (item.quantity || 1)}.00
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Section - Summary & Payment */}
      <div className="right-section">
        <h2 className="summary-title">Summary</h2>

        <table className="summary-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {singleCourse ? (
              <tr>
                <td>{singleCourse.title}</td>
                <td>₹{singleCourse.price}.00</td>
              </tr>
            ) : cart.length === 0 ? (
              <tr><td colSpan="2">No items</td></tr>
            ) : (
              cart.map((item) => (
                <tr key={item.id}>
                  <td>{item.title} × {item.quantity || 1}</td>
                  <td>₹{item.price * (item.quantity || 1)}.00</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <hr />

        <table className="total-table">
          <tbody>
            <tr>
              <td>Subtotal</td>
              <td>₹{finalPrice}.00</td>
            </tr>
            <tr className="total">
              <td>Total</td>
              <td className="big-total">₹{finalPrice}.00</td>
            </tr>
          </tbody>
        </table>

        <div className="payment-box">
          <div className="payment-option">
            <input
              type="radio"
              name="payment"
              id="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            <label htmlFor="upi">Pay with UPI QR Code</label>
          </div>

          {paymentMethod === "upi" && (
            <div className="upi-box">
              <p>
                It uses UPI apps like BHIM, Paytm, Google Pay, PhonePe or any
                Banking UPI app to make payment.
              </p>
              <label>UPI Address *</label>
              <div className="upi-input">
                <input
                  type="text"
                  placeholder="e.g. mobile"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                />
                <select
                  value={upiProvider}
                  onChange={(e) => setUpiProvider(e.target.value)}
                >
                  <option>@ybl</option>
                  <option>@oksbi</option>
                  <option>@okhdfcbank</option>
                  <option>@okaxis</option>
                  <option>@paytm</option>
                  <option>@upi</option>
                </select>
              </div>
            </div>
          )}

          <div className="payment-option">
            <input
              type="radio"
              name="payment"
              id="cashfree"
              checked={paymentMethod === "cashfree"}
              onChange={() => setPaymentMethod("cashfree")}
            />
            <label htmlFor="cashfree">Cashfree Payments</label>
          </div>

          {paymentMethod === "cashfree" && (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <img
                src="https://cashfree.com/assets/images/cashfree-logo.png"
                alt="Cashfree"
                style={{ height: "50px" }}
              />
            </div>
          )}

          <p className="privacy-text">
            Your personal data will be used to process your order and support
            your experience throughout this website. Read our{" "}
            <a href="#">privacy policy</a>.
          </p>

          <div className="terms">
            <input type="checkbox" required id="terms" />
            <label htmlFor="terms">
              I have read and agree to the website{" "}
              <a href="#">terms and conditions</a> *
            </label>
          </div>

          <button type="submit" className="btn" onClick={handlePayment}>
            Complete Payment ₹{finalPrice}.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;