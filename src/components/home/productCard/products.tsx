import { Rating } from "@mui/material";
import "./style.css";

const Products = ({ data, darkText, darkBg }: any) => {
  const { title, price, imageUrl, rating, totalRatings, Discount, checkStock } =
    data;
  const image = imageUrl && imageUrl.imageUrl0;
  const ratingAsNumber = Number(rating);
  const stock = checkStock === "InStock" ? false : true;

  return (
    <div className="p-4 md:w-auto h-full drop-shadow-lg flex flex-wrap relative">
      {stock && (
        <div className="ribbon">
          <span>Out of stock</span>
        </div>
      )}
      <div
        className="h-full w-60 border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden flex flex-col justify-between"
        style={darkBg}
      >
        <div className="flex justify-center items-center cursor-pointer flex-wrap w-full min-h-full object-center">
          <img
            className="rounded-2xl sm:w-full h-52 min-h-[208px] max-h-[208px] object-contain p-2 hover:scale-110 transition-scale-105 duration-300 ease-in-out"
            src={image}
            alt="product"
            width={200}
            height={100}
          />
        </div>
        <div className="p-5 border-t-2">
          <h1
            className="title-font text-lg font-medium text-gray-900 mb-2 line-clamp-3"
            style={darkText}
          >
            {title}
          </h1>
          {/* <p className="leading-relaxed mb-3">{item.description.}</p> */}
          <p
            className="leading-relaxed mb-1 text-xl font-medium"
            style={darkText}
          >
            ₹{price}{" "}
            {Discount && (
              <span className="text-sm text-success-400">
                ({Discount}% off)
              </span>
            )}
          </p>
          {/* {rating && totalRatings && ( */}
          <div className="flex items-center gap-1 text-sm">
            <Rating
              name="half-rating-read"
              defaultValue={ratingAsNumber}
              precision={0.5}
              readOnly
              size="small"
            />{" "}
            ({totalRatings})
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};
export default Products;
