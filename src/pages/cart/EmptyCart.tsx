import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import EmptyCartGirlLottie from "../../assets/Lottie/emptyCartGirl.json";
import EmptyCartLottie from "../../assets/Lottie/emptyCart.json";
import "animate.css"; // Import Animate.css
import { useNavigate } from "react-router-dom";

const EmptyCart = ({ darkText, darkBg }: any) => {
  const [showGirlLottie, setShowGirlLottie] = useState(true);
  useEffect(() => {
    const girlLottie = document.querySelector(".girl-lottie");
    const cartLottie = document.querySelector(".cart-lottie");

    if (girlLottie && cartLottie) {
      girlLottie.classList.add("animate__animated", "animate__bounceInLeft");
      cartLottie.classList.add("animate__animated", "animate__bounceInRight");
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowGirlLottie(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <div className="flex flex-col gap-2 items-center justify-center h-full">
      {showGirlLottie && (
        <Lottie
          animationData={EmptyCartGirlLottie} loop={false}
          className="w-48 girl-lottie animate__animated animate__bounceInLeft"
        />
      )}
      {!showGirlLottie && (
        <Lottie
          animationData={EmptyCartLottie} loop={false}
          className="w-48 cart-lottie animate__animated animate__bounceInRight"
        />
      )}
      <p
        style={darkText}
        className="animate__animated animate__fadeIn animate__delay-1s text-gray-400 font-normal"
      >
        Your Cart is empty!
      </p>
      <p
        style={darkText}
        className="animate__animated animate__fadeIn animate__delay-2s text-gray-300 font-normal"
      >
        Add something to make me happy!
      </p>
      <button
      onClick={handleClick}
        style={darkBg("#000")}
        className="mt-5 px-6 py-2 rounded-md bg-pink-600 text-white shadow-md animate__animated animate__fadeIn animate__delay-3s"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default EmptyCart;
