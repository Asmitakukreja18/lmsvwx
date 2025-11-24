import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Store/CartSlice";
import "../Pages/Courses.css";
import Stars from "../Components/Stars";


const Courses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, purchasedCourses } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (courseId) => cartItems.some((item) => item.id === courseId);

  const handleAddToCart = (course) => {
    if (!user) {
      navigate("/login");
      return;
    }

    dispatch(
      addToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.image || fallbackImg,
      })
    );
  };

  const handleBuyNow = (course) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout", { state: { course } });
    }
  };
 const courses = [
    {
      id: 1,
      title: "Chat GPT for Marketing Course for One Year at ₹499/- In Hindi",
      oldPrice: 9909,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/09/Chatgtp-For-Marketing-768x768.png",
    },
    {
      id: 2,
      title: "YouTube Ads Course",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/01/Designer-2025-01-23T144824.093-768x768.jpeg",
    },
    {
      id: 3,
      title: "How to Write Ad Copy & Video Scripts Course For 1 Year at ₹499/-",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/09/How-To-Write-Add-Copy-and-Video-Scripts-768x768.png",
    },
    {
      id: 4,
      title: "Masterclass to Beat Your Competition",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/09/Masterclass-to-Beat-Your-Competition-768x768.png",
    },
    {
      id: 5,
      title: "Google Analytics",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/09/Goggle-ANalytics-1-768x768.png",
    },
    {
      id: 6,
      title: "Email Marketing",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/01/Designer-2025-01-23T145506.426-768x768.jpeg",
    },
    {
      id: 7,
      title: "Lead Gen without Website",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/01/Designer-2025-01-23T145040.193-768x768.jpeg",
    },
    {
      id: 8,
      title: "Affiliate Marketing Course",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/01/Designer-2025-01-23T145253.339-768x768.jpeg",
    },
    {
      id: 9,
      title: "Omnipresence Ads Course",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/01/Designer-2025-01-23T145640.287-768x768.jpeg",
    },
    {
      id: 10,
      title: "Facebook Ads Analytics",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2025/01/Designer-2025-01-23T145925.208-768x768.jpeg",
    },
    {
      id: 11,
      title: "Shopify Course",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2024/08/Designer-2025-01-23T144031.235-768x768.jpeg",
    },
    {
      id: 12,
      title: "Marketing Fundamentals Course",
      oldPrice: 999,
      price: 499,
      image: "https://vwxb2bonlinecourse.in/wp-content/uploads/2024/08/Designer-2025-01-23T144152.878-768x768.jpeg",
    }
  ];


  return (
    <div className="courses-page">
      <div className="container">
        <section className="course-section">
          <h2 className="section-title">
            40+ Premium Courses <span>with Certificate</span>
          </h2>

          <div className="courses-grid">
            {courses.map((course) => {
              const isPurchased = user && purchasedCourses.includes(course.id);
              const inCart = isInCart(course.id);

              return (
                <div className="course-card" key={course.id}>
                  {/* Image */}
                  <div className="course-image">
                    <img
                      src={course.image}
                      alt={course.title}
                   
                    />
                    {course.id === 7 && <div className="badge bestseller">BESTSELLER</div>}
                  </div>

                  {/* Content */}
                  <div className="course-info">
                  <Stars defaultRating={5} />

                    <h3 className="course-title">{course.title}</h3>

                    <div className="price">
                      <span className="old">₹{course.oldPrice}.00</span>
                      <span className="new">₹{course.price}.00</span>
                      <span className="tax">incl. GST</span>
                    </div>

                    {/* Buttons */}
                    {isPurchased ? (
                      <button
                        className=" play-now"
                        onClick={() => navigate(`/course/${course.id}`)}
                      >
                        Play Now
                      </button>
                    ) : (
                      <div className="button-group">
                        <button
                          className={` ${inCart ? "view-cart" : "add-to-cart"}`}
                          onClick={() =>
                            inCart ? navigate("/cart") : handleAddToCart(course)
                          }
                        >
                          {inCart ? (
                            <>
                              View Cart
                            </>
                          ) : (
                            <>
                              Add to Cart
                            </>
                          )}
                        </button>

                        <button className=" buy-now" onClick={() => handleBuyNow(course)}>
                          Buy Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Courses;