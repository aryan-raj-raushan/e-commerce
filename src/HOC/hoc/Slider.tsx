import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "./style.css";
// import "swiper/css/bundle"
import {
  Autoplay,
  Pagination,
  Navigation,
  FreeMode,
  Scrollbar,
} from "swiper/modules";

export const Slider = ({ children, options }: any) => {
  const swiperOptions = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    navigation: false,
    modules: [Autoplay, Pagination, Navigation],
    ...options,
  };

  return (
    <Swiper {...swiperOptions} className="w-full">
      {children}
    </Swiper>
  );
};

export const Slider2 = ({ children, options }: any) => {
  const swiperOptions = {
    spaceBetween: 10,
    centeredSlides: false,
    modules: [FreeMode, Navigation, Scrollbar],
    freeMode: true,
    // mousewheel: {
    //   releaseOnEdges: true,
    // },
    cssMode: true,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
      // disabledClass: ".swiper-button-disabled",
    },
    scrollbar: {
      hide: true,
      draggable: true,
    },
    ...options,
  };

  return (
    <div className="relative w-full mx-auto">
      <Swiper {...swiperOptions} className="max-w-fit w-[95%]" >
        {children}
      </Swiper>
      <div className="swiper-button-next custom-next absolute"></div>
      <div className="swiper-button-prev custom-prev absolute "></div>
      {/* <div className="swiper-button-disabled"></div> */}
    </div>
  );
};

export const Slider3 = ({ children, options }: any) => {
  const swiperOptions = {
    spaceBetween: 10,
    centeredSlides: false,
    modules: [FreeMode, Scrollbar],
    freeMode: true,
    cssMode: true,
    slidesPerView: "auto",
    scrollbar: {
      hide: true,
      draggable: true,
    },
    // loop: true,
    ...options,
  };

  return (
    <div className="relative w-full">
      <Swiper {...swiperOptions} className="w-auto max-w-fit">
        {children}
      </Swiper>
    </div>
  );
};






