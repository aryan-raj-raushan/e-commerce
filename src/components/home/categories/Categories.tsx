import React from "react";
import { SwiperSlide } from "swiper/react";
import Electronics from "../../../assets/images/electronics.webp"
import Grocery from "../../../assets/images/grocery.webp"
import Toys from "../../../assets/images/toys.webp"
import Fashion from "../../../assets/images/fashion.webp"
import Health from "../../../assets/images/health.webp"
import Sports from "../../../assets/images/sports.webp"
import Furniture from "../../../assets/images/furntiture.webp"
import Beauty from "../../../assets/images/beauty.webp"
import Mobile from "../../../assets/images/mobile.webp"
import Appliances from "../../../assets/images/appliances.webp"
import TopDeals from "../../../assets/images/topdeals.webp"
import Home from "../../../assets/images/home.webp"

import { Slider2 } from "../../../HOC/hoc/Slider";
import { useNavigate } from "react-router-dom";

const Categories = () => {

  const categoryData = [
    { image: TopDeals, title: "Top Deals", label: "topdeals" },
    { image: Electronics, title: "Electronics", label: "electronics" },
    { image: Mobile, title: "Mobiles", label: "mobiles" },
    { image: Grocery, title: "Grocery", label: "grocery" },
    { image: Fashion, title: "Fashion", label: "fashion" },
    { image: Appliances, title: "Appliances", label: "appliances" },
    { image: Toys, title: "Toys", label: "toys" },
    { image: Health, title: "Health", label: "health" },
    { image: Beauty, title: "Beauty", label: "beauty" },
    { image: Home, title: "Home", label: "home" },
    { image: Sports, title: "Sports", label: "sports" },
    { image: Furniture, title: "Furniture", label: "furniture" },
  ];
  const navigate = useNavigate();
  const handleClick = (category: any) => {
    navigate(`/allproducts/${category}`);
  };
  
  return (
    <div className="mt-7 mb-5 mx-auto">
      <Slider2>
        {categoryData.map((category, index) => (
          <SwiperSlide key={index} className="max-w-fit max-h-auto">
            <div
              className="w-20 h-full sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center"
              onClick={() => handleClick(category.label)}
            >
              <img
                src={category.image}
                alt={category.title}
                className="object-contain max-h-28"
              />
              <h4>{category.title}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Slider2>
    </div>
  );
};

export default Categories;
