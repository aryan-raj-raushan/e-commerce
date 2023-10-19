import Products from "./products";
import { useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { Slider3 } from "../../../HOC/hoc/Slider";

const ProductCard = ({mode, productData, title}:any) => {
  const navigate = useNavigate();
  const handleClick = (id: any) => {
    navigate(`/productinfo/${id}`);
  };
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-2 sm:px-5 pt-4 pb-8 md:pt-8 md:pb-12">
        <div className="flex">
          <div className="w-auto mb-3 lg:mb-5 relative sm:mx-10">
            <h1
              className="sm:text-3xl text-2xl font-[900] leading-10  title-font mb-2 text-black "
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              {title}
            </h1>
            <div className="absolute -right-2 -bottom-1 -z-50 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="145"
                height="35"
                viewBox="0 0 186 35"
                fill="none"
              >
                <path
                  d="M84 3.97549C65.3333 8.30883 22.4 19.9755 0 31.9755C56.6667 37.3088 173.2 39.1755 186 3.97549C168 0.975492 122.4 -3.22451 84 3.97549Z"
                  fill="#EBD96B"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className=" max-w-fit">
          <Slider3 className="max-w-fit">
          {productData.map((item: any, index: number) => (
            <SwiperSlide key={index} className="max-w-fit" onClick={()=> handleClick(item.id)}>
              <Products
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                mode={mode}
                data={item}
              />
            </SwiperSlide>
          ))}
          </Slider3>
          
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
