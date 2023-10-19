import Bg1 from "../../../assets/images/beauty-product-1.webp";
import Bg2 from "../../../assets/images/bp-2.webp";
import Bg3 from "../../../assets/images/bp-4.webp";
import Bg4 from "../../../assets/images/bp-5.webp";
import Bg5 from "../../../assets/images/bp-3.webp";
const BeautyCare = () => {
  return (
    <div className="hidden lg:grid grid-rows-6 grid-cols-10 mx-10 grid-flow-col gap-4 min-h-[300px] lg:min-h-[500px] mb-5 lg:mb-10">
      {/* Box1 */}
      <div
        className="col-span-3 row-span-6 bg-contain bg-no-repeat bg-center object-contain rounded-lg  w-full h-full max-w-full max-h-full"
        style={{ backgroundImage: `url(${Bg1})`, backgroundSize: "100% 100%" }}
      >
        <div className="flex flex-col px-4 py-6 gap-3">
          <p className="font-sans">Make time for you</p>
          <p className="text-3xl md:text-4xl font-medium">Radiant Skincare</p>
          <button className="text-start flex items-center justify-center border border-gray-800 hover:border-2 hover:border-black rounded-3xl w-28 py-2 px-3 mt-2 bg-white">
            Shop now
          </button>
        </div>
      </div>
      {/* box 2 */}
      <div
        className="col-span-4 row-span-3 bg-contain bg-no-repeat bg-center object-contain rounded-lg  w-full h-full max-w-full max-h-full"
        style={{
          backgroundImage: `url(${Bg2})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex flex-col px-4 py-6 gap-1">
          <p className="font-sans">Balm oils & more</p>
          <p className="text-xl md:text-2xl font-medium">Tame your beard</p>
          <button className="text-start flex items-center justify-center border border-gray-800 hover:border-2 hover:border-black rounded-3xl w-28 py-2 px-3 mt-2 bg-white">
            Shop now
          </button>
        </div>
      </div>

      {/* Third box, below the first one */}
      <div
        className="col-span-2 row-span-3 bg-contain bg-no-repeat bg-center object-contain rounded-lg  w-full h-full max-w-full max-h-full"
        style={{
          backgroundImage: `url(${Bg3})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex flex-col px-4 py-6 gap-1">
          <p className="text-xl md:text-2xl w-3/5 font-medium">
            For Makeup Lovers
          </p>
          <button className="text-start flex items-center justify-center border border-gray-800 hover:border-2 hover:border-black rounded-3xl w-28 py-2 px-3 mt-2 bg-white">
            Shop now
          </button>
        </div>
      </div>

      <div
        className="col-span-2 row-span-3 bg-contain bg-no-repeat bg-center object-contain rounded-lg  w-full h-full max-w-full max-h-full"
        style={{
          backgroundImage: `url(${Bg4})`,
          backgroundSize: "100% 100%",
        }}
      >
        <div className="flex flex-col px-4 py-6 gap-1">
          <p className="text-xl md:text-xl font-medium">Nail your manicure</p>
          <button className="text-start flex items-center justify-center border border-gray-800 hover:border-2 hover:border-black rounded-3xl w-28 py-2 px-3 mt-2 bg-white">
            Shop now
          </button>
        </div>
      </div>

      <div
        className="col-span-3 row-span-6 bg-contain bg-no-repeat bg-center object-contain rounded-lg  w-full h-full max-w-full max-h-full"
        style={{ backgroundImage: `url(${Bg5})`, backgroundSize: "100% 100%" }}
      >
        <div className="flex flex-col px-4 py-6 gap-1">
          <p className="font-sans">  Straight Ahead to Perfect Hair</p>
          <p className="text-xl md:text-2xl font-medium">Best hair straightener</p>
          <button className="text-start flex items-center justify-center border border-gray-800 hover:border-2 hover:border-black rounded-3xl w-28 py-2 px-3 mt-2 bg-white">
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeautyCare;
