import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export const Slider = ({ children, options }: any) => {
  const swiperOptions = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true
    },
    navigation: false,
    modules: [Autoplay, Pagination, Navigation],
    ...options, // Merge with any custom options passed
  };

  return (
    <Swiper {...swiperOptions} className="w-full">
      {children}
    </Swiper>
  );
};
