import React from "react";
import "./ProductGrid.css"; 
import { useDispatch } from 'react-redux';
import { addToCart } from '../Store/CartSlice';
const products = [
  {
    id: 1,
    badge: "Sale!",
    image:
      "https://vwxb2bonlinecourse.in/wp-content/uploads/woocommerce-placeholder-300x300.png",
    title: "All courses Bundle",
    oldPrice: "₹53,973.00",
    price: "₹999.00",
    isOnSale: true,
  },
  {
    id: 2,
    badge: "Sale!",
    image:
      "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/02/major-components-of-digital-marketing-300x300.png",
    title: "Digital Marketing Mastery Course Bundle",
    oldPrice: "₹37,981.00",
    price: "₹4,999.00",
    isOnSale: true,
  },
  {
    id: 3,
    badge: "Sale!",
    image:
      "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/03/Lead-Generation-Without-Website-300x300.png",
    title: "Lead Gen without Website",
    oldPrice: "₹999.00",
    price: "₹499.00",
    isOnSale: true,
  },
  {
    id: 4,
    image:
      "https://vwxb2bonlinecourse.in/wp-content/uploads/woocommerce-placeholder-300x300.png",
    title: "Perfect diet",
    isOnSale: false,
    readMoreLink: "/perfect-diet",
  },
];

const Shop = () => {

const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: parseInt(product.price.replace(/[^0-9]/g, '')),
      image: product.image,
    }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Courses</h2>
          <p className="mt-4 text-lg text-gray-600">
            Grab the best deals before they're gone!
          </p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Sale Badge */}
              {product.badge && (
                <span className="badgetwo absolute top-4 left-4 z-10">
                  {product.badge}
                </span>
              )}

              {/* Product Image */}
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {product.title}
                </h3>

                {product.isOnSale ? (
                  <>
                    <p className="price text-2xl font-extrabold text-green-600">
                      <span className="old text-lg text-gray-500 line-through mr-2">
                        {product.oldPrice}
                      </span>
                      {product.price}
                      <span className="small text-sm text-gray-500 ml-1">
                        incl. GST
                      </span>
                    </p>

                    <button
                      className="cart-btn add-to-cart w-full mt-5 py-3 text-lg font-semibold rounded-lg transition-all"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </>
                ) : (
                  <button className="read-btn w-full mt-5 py-3 text-lg font-semibold rounded-lg">
                    <a href={product.readMoreLink} className="block w-full h-full">
                      Read More
                    </a>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;