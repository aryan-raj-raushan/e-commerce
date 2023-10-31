import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import myContext from "../../context/myContext";
import { firebaseDb } from "../../firebase/firebase.config";
import Layout from "../../components/layout/layout";
import Lottie from "lottie-react";
import Loader from "../../assets/Lottie/dropLoader.json";
import { Rating } from "@mui/material";
import { getCommonStyles } from "../../HOC/hoc/HOC";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context;

  const [products, setProducts] = useState<any>("");
  const params = useParams();
  const { id } = params;
  const getProductData = async () => {
    setLoading(true);
    try {
      if (id) {
        const productTemp: any = await getDoc(doc(firebaseDb, "products", id));
        setProducts(productTemp.data());
        setLoading(false);
      } else {
        console.error("id is undefined");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart);
  const addCart = (products: any) => {
    dispatch(addToCart(products));
    toast.success("add to cart");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const { imageUrl, title, description, price, rating,totalRatings } = products;
  console.log(products)
  const image = imageUrl && imageUrl.imageUrl0
  const [displayedLines, setDisplayedLines] = useState(3); // Change to state
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const darkText = getCommonStyles(mode);

  const socialMedia = [
    { icon: <FaFacebookF />, link: "/facebook.com" },
    { icon: <FaTwitter />, link: "/twitter.com" },
    { icon: <FaInstagram />, link: "/instagram.com" },
  ];

  return (
    <Layout>
      {loading ? (
        <div className="text-center flex justify-center h-full my-10 sm:my-20">
          <Lottie animationData={Loader} loop={true} className="w-48 h-full" />
        </div>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-10 mx-auto">
            {products && (
              <div className="lg:w-4/5 mx-auto flex flex-wrap">
                <img
                  alt={title}
                  className="lg:w-1/3 w-full h-64 lg:h-full object-contain lg:object-cover object-center rounded max-w-full"
                  src={image}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <h1
                    className="text-gray-900 text-3xl title-font font-medium mb-1"
                    style={darkText}
                  >
                    {title}
                  </h1>
                  <div className="flex mb-2">
                    <span className="flex items-center">
                      <Rating
                        name="half-rating-read"
                        value={rating}
                        precision={0.5}
                        readOnly
                      />
                      <span className="text-gray-600 ml-3" style={darkText}>
                        {totalRatings} Reviews
                      </span>
                    </span>

                    <div
                      className="flex items-center pl-2 ml-3 border-l-2 border-gray-200 gap-1"
                      style={darkText}
                    >
                      {socialMedia.map((item, index) => (
                        <a
                          key={index}
                          href={item.link}
                          className="text-gray-500 hover:scale-110"
                        >
                          {item.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div
                    className="title-font font-medium text-2xl text-gray-900 pb-2"
                    style={darkText}
                  >
                    ₹{price}
                  </div>
                  <div className="leading-relaxed border-b-2 mb-5 pb-5">
                    <h2
                      className="text-gray-700 text-base font-medium"
                      style={darkText}
                    >
                      About this item :
                    </h2>
                    <div
                      className="text-sm text-gray-700 mt-2"
                      style={darkText}
                    >
                      {description
                        .split("\n")
                        .slice(0, isExpanded ? undefined : displayedLines)
                        .map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                    </div>
                    <button
                      onClick={toggleExpand}
                      className="text-gray-900 pt-2"
                      style={darkText}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  </div>

                  <div className="flex">
                    <button
                      onClick={() => addCart(products)}
                      className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      Add To Cart
                    </button>
                    <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                      <svg
                        fill="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}

export default ProductInfo;
