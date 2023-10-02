import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import Layout from "../../components/layout/layout";
import CartModal from "../../components/modal/CartModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const context = useContext(myContext);
  const { mode } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart);
  console.log(cartItems);

  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem: any) => {
      const priceWithoutCommas = cartItem.price.replace(/,/g, "");
      const priceAsFloat = parseFloat(priceWithoutCommas);
      if (!isNaN(priceAsFloat)) {
        temp += priceAsFloat;
      }
    });
    setTotalAmount(temp);
    console.log(temp);
  }, [cartItems]);

  const shipping: number = 100;
  const grandTotal = shipping + totalAmount;

  // add to cart
  const deleteCart = (item: any) => {
    dispatch(deleteFromCart(item));
    toast.success("delete g cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [expandedItems, setExpandedItems] = useState<(number | string)[]>([]);
  // Adjust the number of lines to display initially
  const [displayedLines, setDisplayedLines] = useState(3); 

  const toggleExpand = (index: number) => {
    if (expandedItems.includes(index)) {
      // Item is expanded, so collapse it
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      // Item is not expanded, so expand it
      setExpandedItems([...expandedItems, index]);
    }
  };

  return (
    <Layout>
      <div
        className="h-full bg-white pt-5 pb-10"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">
            {cartItems.map((item: any, index: number) => {
              const { price, description, title, imageUrl } = item;
              const isExpanded = expandedItems.includes(index);
              return (
                <div
                  key={index}
                  className={`justify-between mb-10 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start ${
                    isExpanded ? "expanded" : ""
                  }`}
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full rounded-lg sm:w-40 sm:h-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2
                        className="text-lg font-bold text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h2>
                      <p
                        className="mt-1 text-sm font-semibold text-gray-700"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹{price}
                      </p>

                      <div className="text-sm text-gray-900 mt-2">
                        {description
                          .split("\n")
                          .slice(0, isExpanded ? undefined : displayedLines)
                          .map((item: any, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                      </div>
                      <button
                        onClick={() => toggleExpand(index)}
                        className="text-gray-900 pt-2"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="mb-2 flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Subtotal
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹100
              </p>
            </div>
            <div className="flex justify-between">
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Shipping
              </p>
              <p
                className="text-gray-700"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                ₹20
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p
                className="text-lg font-bold"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Total
              </p>
              <div>
                <p
                  className="mb-1 text-lg font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹200
                </p>
              </div>
            </div>
            {/* <Modal  /> */}
            <CartModal />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
