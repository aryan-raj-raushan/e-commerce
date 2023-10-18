import { SwiperSlide } from "swiper/react";
import { Slider } from "../../HOC/hoc/Slider";
import Slide1 from "../../assets/images/SliderImage2.gif";
import Slide2 from "../../assets/images/SliderImage1.jpg";
import Slide3 from "../../assets/images/SliderImage3.jpg";
import Slide4 from "../../assets/images/SliderImage4.gif";
import Slide5 from "../../assets/images/SliderImage5.jpg";
import Slide6 from "../../assets/images/SliderImage6.jpg";

const imageSources = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6];

const HeroSection = () => {
  return (
    <div className="">
      <Slider >
        {imageSources.map((src, index) => (
          <SwiperSlide
            key={index}
            className="text-center text-18 bg-white flex justify-center items-center"
          >
            <div className="w-full flex items-center justify-center">
              <img
                src={src}
                alt=""
                className="bg-cover w-full h-full max-w-full max-h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
