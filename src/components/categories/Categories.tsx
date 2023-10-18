import React from "react";
import { SwiperSlide } from "swiper/react";
import Electronics from "../../assets/images/electronics.webp";
import Grocery from "../../assets/images/grocery.webp";
import Toys from "../../assets/images/toys.webp";
import Fashion from "../../assets/images/fashion.webp";
import Health from "../../assets/images/health.webp";
import Sports from "../../assets/images/sports.webp";
import Furniture from '../../assets/images/furntiture.webp'
import Beauty from '../../assets/images/beauty.webp'
import Mobile from '../../assets/images/mobile.webp'
import Appliances from '../../assets/images/appliances.webp'
import TopDeals from "../../assets/images/topdeals.webp"
import Home from '../../assets/images/home.webp'
import {Slider2 } from "../../HOC/hoc/Slider";

const Categories = () => {
  const categoryData = [
    { image: TopDeals, title: "Top Deals" },
    { image: Electronics, title: "Electronics" },
    { image: Mobile, title: "Mobiles" },
    { image: Grocery, title: "Grocery" },
    { image: Fashion, title: "Fashion" },
    { image: Appliances, title: "Appliances" },
    { image: Toys, title: "Toys" },
    { image: Health, title: "Health" },
    { image: Beauty, title: "Beauty" },
    { image: Home, title: "Home" },
    { image: Sports, title: "Sports" },
    { image: Furniture, title: "Furniture" },
  ];

  return (
    <div className="mt-7 mb-5 mx-auto">
      <Slider2 >
        {categoryData.map((category, index) => (
          <SwiperSlide key={index} className="max-w-fit max-h-auto mx- lg:mx-">
            <div className="w-20 h-full sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center">
              <img src={category.image} alt={category.title} className="object-contain max-h-28"/>
              <h4>{category.title}</h4>
            </div>
          </SwiperSlide>
        ))}       
      </Slider2>
    </div>
  );
};

export default Categories;
