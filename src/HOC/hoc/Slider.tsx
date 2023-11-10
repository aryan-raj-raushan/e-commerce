import { Swiper, SwiperSlide } from "swiper/react";
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
  Thumbs,
} from "swiper/modules";
import { useState } from "react";

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
    cssMode: true,
    slidesPerView: "auto",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      hide: true,
      draggable: true,
    },
    ...options,
  };

  return (
    <div className="relative w-full mx-auto">
      <Swiper {...swiperOptions} className="max-w-fit w-[95%] ">
        {children}
      </Swiper>
      <div className="swiper-button-next custom-next absolute"></div>
      <div className="swiper-button-prev custom-prev absolute "></div>
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

export const Slider4 = ({ children, options, title }: any) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const swiperOptions = {
    spaceBetween: 5,
    loop: true,
    navigation: false,
    modules: [FreeMode, Pagination, Thumbs],
    watchSlidesProgress: true,
    slidesPerView: 5,
    freeMode: true,
    direction: "vertical",
    ...options,
  };
  const swiperOptions2 = {
    spaceBetween: 10,
    loop: true,
    navigation: false,
    modules: [FreeMode, Pagination, Thumbs],
    ...options,
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="lg:-left-14 absolute top-0 h-full -left-4 sm:-left-10"
        style={{
          zIndex: 1,
        }}
      >
        <Swiper
          {...swiperOptions}
          onSwiper={setThumbsSwiper}
          className="mySwiper w-full h-full cursor-pointer space-y-2"
        >
          {children.map((item: any, index: number) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={item}
                  className="w-16 h-full border border-gray-200 rounded-lg object-contain"
                  alt={title}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Swiper
        {...swiperOptions2}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="mySwiper2 w-4/5 h-full"
      >
        {children.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={item}
                className="object-contain lg:object-contain object-center rounded max-w-full w-full"
                alt={title}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
