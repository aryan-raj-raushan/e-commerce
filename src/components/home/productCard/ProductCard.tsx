import Products from "./products";
import { Link, useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";
import { Slider3 } from "../../../HOC/hoc/Slider";
import { getCommonStyles } from "../../../HOC/hoc/HOC";

const ProductCard = ({ mode, productData, title, filterData, link }: any) => {
  const navigate = useNavigate();
  const handleClick = (id: any) => {
    navigate(`/productinfo/${id}`);
  };
  const darkText = getCommonStyles(mode);
  const darkBg = getCommonStyles(mode, { backgroundColor: "rgb(46 49 55)" });

  let filteredProducts = [];
  const copyProductData = [...productData];
  switch (filterData) {
    case "newArrivals":
      filteredProducts = copyProductData
        .sort((a: any, b: any) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        })
        .slice(0, 10);
      break;
    case "beauty":
      filteredProducts = copyProductData.filter(
        (item: any) => item.allCategory.category === "beauty"
      );
      break;
    case "mobile":
      filteredProducts = copyProductData.filter(
        (item: any) => item.allCategory.category === "mobile"
      );
      break;
    case "electronics":
      filteredProducts = copyProductData.filter(
        (item: any) => item.allCategory.category === "electronics"
      );
      break;
    case "fashion":
      filteredProducts = copyProductData.filter(
        (item: any) => item.allCategory.category === "fashion"
      );
      break;
    default:
      filteredProducts = copyProductData.sort((a: any, b: any) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
      break;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="px-2 sm:px-5 pt-4 pb-8 md:pt-8 md:pb-12">
        <div className="flex justify-between items-center">
          <div className="w-auto mb-3 lg:mb-5 relative mx-4 sm:mx-10">
            <h1
              className="sm:text-3xl text-lg font-[900] leading-10  title-font mb-2 text-black "
              style={darkText}
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
          <Link
            className="mr-4 sm:mr-10 text-sm sm:text-lg font-normal underline underline-offset-4 decoration-gray-500 cursor-pointer"
            to={link}
          >
            View all
          </Link>
        </div>

        {/* Products */}
        <div className="max-w-fit">
          <Slider3 className="max-w-fit">
            {filteredProducts.map((item: any, index: number) => (
              <SwiperSlide
                key={index}
                className="max-w-fit"
                onClick={() => handleClick(item.id)}
              >
                <Products
                  data={item}
                  darkText={darkText}
                  darkBg={darkBg}
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
