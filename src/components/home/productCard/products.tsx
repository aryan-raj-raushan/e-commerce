const Products = ({ data,darkText,darkBg }: any) => {
  const { title, price, imageUrl } = data;
  return (
    <div
        className="p-4 md:w-auto h-full drop-shadow-lg flex flex-wrap"
      >
        <div
          className="h-full w-60 border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden flex flex-col justify-between"
          style={darkBg}
        >
          <div className="flex justify-center items-center cursor-pointer flex-wrap w-full min-h-full object-center">
            <img
              className="rounded-2xl sm:w-full min-h-[180px] max-h-40 object-contain p-2 hover:scale-110 transition-scale-105 duration-300 ease-in-out"
              src={imageUrl}
              alt="product"
              width={200}
              height={100}
            />
          </div>
          <div className="p-5 border-t-2">
            <h1
              className="title-font text-lg font-medium text-gray-900 mb-3 truncate"
              style={darkText}
            >
              {title}
            </h1>
            {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
            <p
              className="leading-relaxed mb-3 text-lg font-medium"
              style={darkText}
            >
              ₹{price}
            </p>
          </div>
        </div>
      </div>
  );
};
export default Products