import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import Lottie from "lottie-react";
import Loader from "../../assets/Lottie/dropLoader.json";
import { IconButton, Rating } from "@mui/material";
import useProductInfoHook from "./useProductInfoHook";
import { Slider4 } from "../../HOC/hoc/Slider";
import { Link } from "react-router-dom";
import { Favorite } from "@mui/icons-material";
import { toast } from "react-toastify";
// import { Slider4 } from "../../HOC/hoc/ReactSlider";

const ProductInfo = () => {
  const {
    loading,
    products,
    darkText,
    socialMedia,
    isExpanded,
    toggleExpand,
    addCart,
  } = useProductInfoHook();

  const {
    imageUrl,
    title,
    description,
    price,
    rating,
    totalRatings,
    Discount,
  } = products;
  const ratingAsNumber = Number(rating);
  const imageSlider: any =
    imageUrl &&
    Object.entries(imageUrl)
      .sort(
        ([a], [b]) =>
          parseInt(a.replace("imageUrl", "")) -
          parseInt(b.replace("imageUrl", ""))
      )
      .map(([, url]) => url);
  const [active, setActive] = useState(false);
  const handleWishlistClick = () => {
    setActive(!active);
    if (!active) {
      toast.success("Add to wishlist", {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    };
  };
console.log(imageUrl,products)
  return (
    <Layout>
      {loading ? (
        <div className="text-center flex justify-center h-full my-10 sm:my-20">
          <Lottie animationData={Loader} loop={true} className="w-48 h-full" />
        </div>
      ) : (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-10 ">
            {products && (
              <div className="w-full lg:w-11/12 h-full flex flex-wrap justify-center ml-16">
                <div className="w-full md:w-3/5 lg:w-1/3 lg:h-full">
                  <Slider4 title={title}>{imageSlider}</Slider4>
                </div>

                <div className="lg:w-1/2 w-full lg:pl-5 lg:py-6 mt-6 lg:mt-0 text-start">
                  <h1
                    className="text-gray-900 text-3xl title-font font-medium mb-1"
                    style={darkText}
                  >
                    {title}
                  </h1>
                  <div className="flex mb-2 items-center mt-1">
                    <div className="flex items-center text-sm">
                      <Rating
                        name="half-rating-read"
                        value={ratingAsNumber}
                        precision={0.5}
                        readOnly
                        size="small"
                      />
                      <span className="text-gray-600 ml-1" style={darkText}>
                        ({totalRatings}) Reviews
                      </span>
                    </div>

                    <div
                      className="flex items-center pl-1 ml-3 border-l-2 border-gray-200 gap-1"
                      style={darkText}
                    >
                      {socialMedia.map((item, index) => (
                        <Link
                          key={index}
                          to={item.link}
                          className="text-gray-500 hover:scale-110"
                          target="_blank"
                        >
                          {item.icon}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div
                    className="title-font font-medium text-2xl text-gray-900 pb-2"
                    style={darkText}
                  >
                    ₹{price}{" "}
                    {Discount && (
                      <span className="text-sm text-success-400">
                        ({Discount}% off)
                      </span>
                    )}
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
                        .slice(0, isExpanded ? undefined : 3)
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

                  <div className="flex justify-end">
                    <button
                      onClick={() => addCart(products)}
                      className="flex items-center text-white bg-indigo-500 border-0 py-1 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                    >
                      Add To Cart
                    </button>
                    <IconButton
                      aria-label="Add to Wishlist"
                      onClick={handleWishlistClick}
                      // style={{
                      //   backgroundColor: active ? 'gray' : 'white',
                      //   borderRadius: '50%',
                      //   width: '40px',
                      //   height: '40px',
                      // }}
                    >
                      <Favorite
                        sx={{ color: active ? "red" : " rgb(102 112 133)" }}
                        fontSize="medium"
                      />{" "}
                    </IconButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductInfo;
