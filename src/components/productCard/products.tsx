import React from "react";

const Products = ({ mode, handleCart, data, handleClick }: any) => {
  const { title, price, imageUrl, id } = data;
  return (
    <div
      className="p-4 md:w-1/4 drop-shadow-lg"
      onClick={() => handleClick(id)}
    >
      <div
        className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden flex flex-col justify-between"
        style={{
          backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <div className="flex justify-center cursor-pointer">
          <img
            className="rounded-2xl  sm:w-full min-h-[300px] max-h-96 object-contain p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
            src={imageUrl}
            alt="product"
          />
        </div>
        <div className="p-5 border-t-2">
          <h1
            className="title-font text-lg font-medium text-gray-900 mb-3 truncate"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            {title}
          </h1>
          {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
          <p
            className="leading-relaxed mb-3"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            ₹{price}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => handleCart(data)}
              type="button"
              className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products