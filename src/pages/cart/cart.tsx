import Layout from "../../components/layout/layout";
import Shipping from "./Shipping";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import useCartHook from "./useCartHook";
import EmptyCart from "./EmptyCart";
// import Lottie from "lottie-react";

const Cart = () => {
  const {
    darkText,
    darkBg,
    handleIncrease,
    handleDecrease,
    uniqueCart,
    cartItems,
  } = useCartHook();

  return (
    <Layout showFull={false} className={true}>
      <div className="h-full bg-white py-10 " style={darkBg("#282c34")}>
        {cartItems && cartItems.length > 0 ? (
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
            <div className="rounded-lg md:w-2/3 ">
              {uniqueCart.map((item: any, index: number) => {
                const { price, title, imageUrl, count } = item;
                const priceWithoutCommas = price.replace(/,/g, "");
                const priceAsFloat = parseFloat(priceWithoutCommas);
                const shipping = priceAsFloat > 500 ? 0 : 40;
                return (
                  <div
                    key={index}
                    className={`justify-between mb-10 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start`}
                    style={darkBg("rgb(32,33,34)")}
                  >
                    <div className="justify-between flex sm:justify-start flex-1">
                      <img
                        src={imageUrl}
                        alt={title}
                        className="rounded-lg w-40 h-40 object-contain"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2
                            className="text-sm sm:text-base font-bold text-gray-900"
                            style={darkText}
                          >
                            {title}
                          </h2>
                          <p
                            className="pt-2 text-base font-semibold text-gray-700"
                            style={darkText}
                          >
                            ₹{price}{" "}
                            <span className="text-green-500 text-sm pl-1">
                              (10% off)
                            </span>
                          </p>
                          <div className="w-20 flex items-center justify-between border border-gray-300 px-2 rounded mt-4">
                            <button
                              onClick={() => handleDecrease(item)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <AiOutlineMinus />
                            </button>
                            <div className="w-12 text-center">{count}</div>
                            <button
                              onClick={() => handleIncrease(item)}
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <AiOutlinePlus />
                            </button>
                          </div>
                          <div className="text-sm pt-5 flex flex-col sm:flex-row items-start sm:items-center gap-1">
                            Delivery by Fri Oct 6{" "}
                            <span className="hidden sm:block">| </span>
                            <div className="text-gray-700 " style={darkText}>
                              {priceAsFloat > 500 ? (
                                <>
                                  <span className="line-through">₹40</span>{" "}
                                  <span className="text-green-700">Free</span>
                                </>
                              ) : (
                                <>
                                  <span className="">₹{shipping}</span>{" "}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
             
            </div>

            <Shipping
              cartItems={cartItems}
              darkText={darkText}
              darkBg={darkBg}
            />
          </div>
        ) : (
          <EmptyCart darkText={darkText} darkBg={darkBg} />
        )}
      </div>
    </Layout>
  );
};

export default Cart;

// const [expandedItems, setExpandedItems] = useState<(number | string)[]>([]);
// // Adjust the number of lines to display initially
// // const [displayedLines, setDisplayedLines] = useState(3);
// const displayedLines:number = 3

// const toggleExpand = (index: number) => {
//   if (expandedItems.includes(index)) {
//     // Item is expanded, so collapse it
//     setExpandedItems(expandedItems.filter((item) => item !== index));
//   } else {
//     // Item is not expanded, so expand it
//     setExpandedItems([...expandedItems, index]);
//   }
// };

//  const isExpanded = expandedItems.includes(index);
// {/* <div
//                         className="text-sm text-gray-700 mt-2"
//                         style={darkText}
//                       >
//                         {description
//                           .split("\n")
//                           .slice(0, isExpanded ? undefined : displayedLines)
//                           .map((item: any, index: number) => (
//                             <li key={index}>{item}</li>
//                           ))}
//                       </div>
//                       <button
//                         onClick={() => toggleExpand(index)}
//                         className="text-gray-900 pt-2"
//                         style={darkText}
//                       >
//                         {isExpanded ? "Read Less" : "Read More"}
//                       </button> */}

// <div
//                     onClick={() => deleteCart(item)}
//                     className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6 cursor-pointer"
//                   >
//                     <BsTrash3 size={20} />
//                   </div>
