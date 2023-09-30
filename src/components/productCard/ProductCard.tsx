import React, { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Products from "./products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const ProductCard = () => {
  const context = useContext(myContext);
  const { mode,product } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart);
  const addCart = (product: any) => {
    dispatch(addToCart(product));
    toast.success("add to cart");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

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
          {product.map((item: any, index: number) => (
            <Products
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              mode={mode}
              handleCart= {addCart}
              data={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
