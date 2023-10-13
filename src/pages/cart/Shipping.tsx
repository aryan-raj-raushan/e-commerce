import useCartHook from "./useCartHook";

const Shipping = ({ cartItems, darkText, darkBg }: any) => {
  const { cartSummary,handlePayment } = useCartHook();
  const {
    totalAmount,
    grandTotal,
    securePackageCharge,
    shipping,
    totalDiscount,
    delivery,
    totalItems
  } = cartSummary;
  return (
    <div
      className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 md:sticky md:top-36"
      style={darkBg("rgb(32,33,34)")}
    >
      <div className="pb-3 flex justify-between">
        <p className="text-gray-700" style={darkText}>
          Price{" "}
          {cartItems.length > 0 && <span>({totalItems} items)</span>}
        </p>
        <p className="text-gray-700 font-medium" style={darkText}>
          ₹{totalAmount}
        </p>
      </div>
      <div className="flex justify-between pb-3">
        <p className="text-gray-700" style={darkText}>
          Add. 10% Off
        </p>
        <p className="text-green-600 font-normal text-lg" style={darkText}>
          -{totalDiscount}
        </p>
      </div>
      <div className="flex justify-between pb-3">
        <p className="text-gray-700" style={darkText}>
          Delivery Charges
        </p>
        <p className="text-gray-700 " style={darkText}>
          {shipping === 0 ? (
            <>
              <span className="line-through">₹{delivery}</span>{" "}
              <span className="text-green-700">Free</span>
            </>
          ) : (
            <>
              <span className="">₹{delivery}</span>{" "}
            </>
          )}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-700" style={darkText}>
          Secured Packaging Fee
        </p>
        <p className="text-gray-700" style={darkText}>
          ₹{securePackageCharge}
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex justify-between mb-3">
        <p className="text-base font-bold" style={darkText}>
          Total Amount
        </p>
        <div>
          <p className="mb-1 text-lg font-bold" style={darkText}>
            ₹{grandTotal}
          </p>
        </div>
      </div>
      <div className="  text-center rounded-lg text-white font-bold">
        <button
          type="button"
          onClick={handlePayment}
          className="w-full  bg-violet-600 py-2 text-center rounded-lg text-white font-bold"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Shipping;
