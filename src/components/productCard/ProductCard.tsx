import React, { useContext } from "react";
import myContext from "../../context/myContext";
import Products from "./products";

const items = [
  {
    title: "This is title 1",
    price: "₹ 500",
    imageUrl: "https://dummyimage.com/720x400",
  },
  {
    title: "This is title 2",
    price: "₹ 500",
    imageUrl: "https://dummyimage.com/720x400",
  },
  {
    title: "This is title 3",
    price: "₹ 500",
    imageUrl: "https://dummyimage.com/720x400",
  },
  {
    title: "This is title 4",
    price: "₹ 500",
    imageUrl: "https://dummyimage.com/720x400",
  },
];

const ProductCard = () => {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-pink-600 rounded"></div>
        </div>

        {/* Products */}
        <div className="flex flex-wrap -m-4">
          {items.map((item: any, index: number) => (
            <Products
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              mode={mode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
