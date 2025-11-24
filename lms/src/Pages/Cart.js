// Pages/Cart.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../Store/CartSlice"; // clearCart hataya kyuki use nahi ho raha
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redux se cart items lo
  const cart = useSelector((state) => state.cart?.items || []);
  
  // Total price calculate karo (quantity nahi hai to 1 assume karo)
  const totalPrice = cart.reduce((total, item) => {
    const qty = item.quantity || 1;
    return total + item.price * qty;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>
        <div className="empty-cart">
          <p>Your cart is currently empty</p>
          <Link to="/courses" className="return-btn">Return to Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart ({cart.length} items)</h1>

      <div className="cart-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              const qty = item.quantity || 1;
              return (
                <tr key={item.id}>
                  <td>
                    <button
                      className="remove"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      ×
                    </button>
                  </td>
                  <td className="product-data">
                    <img src={item.image} alt={item.title} />
                    <strong>{item.title}</strong>
                  </td>
                  <td>₹{item.price}.00</td>
                  <td>{qty}</td>
                  <td>₹{item.price * qty}.00</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="summary-box">
          <h3>
            <span>Total</span>
            <span>₹{totalPrice}.00</span>
          </h3>
          <button
            className="btn checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;