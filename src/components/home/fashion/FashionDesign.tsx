import F1 from "../../../assets/images/f1.webp";
import F2 from "../../../assets/images/f2.jpg";
import F4 from "../../../assets/images/f4.jpg";
import F5 from "../../../assets/images/f5.jpg";
import F7 from "../../../assets/images/f7.jpg";
import F3 from "../../../assets/images/f3.jpg";
import F6 from "../../../assets/images/f6.jpg";
import F8 from "../../../assets/images/f8.jpg";
import F10 from "../../../assets/images/f10.webp";
import { Link } from "react-router-dom";

const FashionDesign = () => {
  return (
    <div className="hidden xl:grid grid-rows-5 grid-cols-4 mx-10 grid-flow-col gap-5 min-h-[300px] md:min-h-[500px] lg:min-h-[800px] lg:max-h-[1000px] mb-5 lg:mb-10">
      {/* box 1 */}
      <div
        className=" bg-contain bg-no-repeat bg-center object-contain rounded-lg  w-full h-full max-w-full max-h-full"
        style={{ backgroundImage: `url(${F1})`, backgroundSize: "100% 100%" }}
      >
        <Link to={"/allproducts/beauty"}>
          <div className="flex items-end justify-start px-4 py-6 gap-3 h-full">
            <p className="text-2xl text-white font-medium ">Beauty</p>
          </div>
        </Link>
      </div>
      {/* box 2 */}
      <div
        className="row-span-3 bg-contain bg-no-repeat bg-center object-contain rounded-lg  w-full h-full max-w-full max-h-full"
        style={{ backgroundImage: `url(${F3})`, backgroundSize: "100% 100%" }}
      >
        <Link to={"/allproducts/fashion/men"}>
          <div className="flex flex-col items-start justify-start px-4 py-6 h-full">
            <p className="text-3xl text-white font-medium mt-10">Men's Wear</p>
            <p className="text-3xl text-white font-medium pt-5 w-1/2">
              T-shirts & Jeans
            </p>
          </div>
        </Link>
      </div>

      <div className="bg-cover bg-no-repeat object-contain">
        <Link to={"/allproducts/beauty/fragrances"}>
        <img
          src={F7}
          alt="Perfume"
          width={800}
          className="w-full h-[100%] rounded-xl "
        />
        </Link>
        
      </div>
      {/* Box 4 */}
      <div className="row-span-2 col-span-2">
        <video className="rounded-xl" loop autoPlay muted>
          <source
            src={require("../../../assets/video/fashion.mp4")}
            type="video/mp4"
          />
        </video>
      </div>
      <div className="row-span-2 col-span-1 bg-cover bg-no-repeat object-contain">
        <Link to={"/allproducts/fashion/women/dresses"}>
          <img
            src={F2}
            alt="Women dresses"
            width={800}
            className="w-full h-[100%] rounded-xl "
          />
        </Link>
      </div>
      <div className="col-span-2 bg-cover bg-no-repeat object-contain">
        {/* <Link to={"/allproducts/fashion/women/dresses"}> */}
        <img
          src={F6}
          alt="Menswear discount"
          width={800}
          className="w-full h-[100%] rounded-xl "
        />
        {/* </Link> */}
      </div>
      <div className="row-span-2 col-span-1 bg-cover bg-no-repeat object-contain">
        <Link to={"/allproducts/fashion/women/dresses"}>
          <img
            src={F5}
            alt="Women Kurtas sets"
            width={800}
            className="w-full h-[100%] rounded-xl "
          />
        </Link>
      </div>
      <div className="bg-contain bg-no-repeat object-contain ">
        <Link to={"/allproducts/fashion/women/shoes"}>
          <img
            src={F8}
            alt="Footwear"
            width={800}
            className="w-full h-[100%] rounded-xl "
          />
        </Link>
      </div>
      {/* box 9 */}
      <div className="bg-contain bg-no-repeat object-contain relative">
        <p className="absolute text-xl text-white font-medium bottom-4 left-3">
          Watches
        </p>
        <img
          src={F4}
          alt="Watches"
          width={800}
          className="w-full h-[100%] rounded-xl "
        />
      </div>
      {/* box 10 */}
      <div
        className="row-span-3 bg-contain bg-no-repeat bg-center object-contain rounded-lg  w-full h-full max-w-full max-h-full"
        style={{ backgroundImage: `url(${F10})`, backgroundSize: "100% 100%" }}
      >
        <Link to={"/allproducts/fashion/kids"}>
          <div className="flex items-start justify-start px-4 py-6 gap-3 h-full">
            <p className="text-3xl text-white font-medium mt-10">Kids Wear</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FashionDesign;
