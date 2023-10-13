import { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommonStyles,
  showSuccessToast,
} from "../../HOC/hoc/HOC";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useCartHook = () => {
  const context = useContext(myContext);
  const { mode,setPaymentMode } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const darkText = getCommonStyles(mode);
  const darkBg = (string: string) =>
    getCommonStyles(mode, { backgroundColor: string });

  // const [quantity, setQuantity] = useState(1);

  /* -------------------------------------------------------------------------- */
  /*                                 handleCart                                 */
  /* -------------------------------------------------------------------------- */
  const handleIncrease = (item: any) => {
    dispatch(addToCart(item));
    toast.success("Added Successfully", {
      position: "bottom-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      // theme: "colored",
    });
  };
  const handleDecrease = (item: any) => {
    if (item.count === 1) {
      showSuccessToast(`Remove from cart ${item.title}`);
    } else {
      toast.success("Removed Successfully", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        // theme: "colored",
      });
    }
    dispatch(deleteFromCart(item));
  };

  // const reversedCartItems = [...cartItems].reverse();

  const uniqueItems: { [key: string]: any } = {};

  cartItems.forEach((item: any) => {
    const itemId = item.id;

    if (!uniqueItems[itemId]) {
      uniqueItems[itemId] = {
        ...item,
        count: 1,
      };
    } else {
      uniqueItems[itemId].count++;
    }
  });
  const uniqueCart = Object.values(uniqueItems).reverse();

  /* -------------------------------------------------------------------------- */
  /*                                Shipping Cart                               */
  /* -------------------------------------------------------------------------- */

  const [cartSummary, setCartSummary] = useState({
    totalAmount: "",
    grandTotal: "",
    securePackageCharge: 0,
    shipping: 0,
    totalDiscount: "",
    delivery: 0,
    buyItem: 0,
    totalItems: 0
  });

  const calculateTotals = (cartItems: any) => {
    let totalAmount = 0;
    let securePackageCharge = 0;
    let discount = 10;

    cartItems.forEach((cartItem: any) => {
      const priceWithoutCommas =
        cartItem.price && cartItem.price.replace(/,/g, "");
      const priceAsFloat = parseFloat(priceWithoutCommas);
      if (!isNaN(priceAsFloat)) {
        totalAmount += priceAsFloat;
      }

      if (
        cartItem.category &&
        (/phone/i.test(cartItem.category) || /mobile/i.test(cartItem.category))
      ) {
        securePackageCharge += 49; // Adjust the secure package charge as needed
      }
    });

    const shipping = totalAmount > 500 || cartItems.length === 0 ? 0 : 40;
    const delivery = cartItems.length * 40;
    const discountedPrice = totalAmount - (totalAmount * discount) / 100;

    const grandTotal = shipping + discountedPrice + securePackageCharge;
    const totalDiscount = (totalAmount - discountedPrice).toFixed(2);
    const buyItem = grandTotal;
    const totalItems = cartItems.length

    return {
      totalAmount,
      shipping,
      grandTotal,
      securePackageCharge,
      totalDiscount,
      delivery,
      buyItem,
      totalItems
    };
  };

  useEffect(() => {
    setCartSummary((prevCartSummary:any) => {
      const cartSummaryValues = calculateTotals(cartItems);
      const numberFormatter = new Intl.NumberFormat("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return {
        ...prevCartSummary,
        ...cartSummaryValues,
        totalAmount: numberFormatter.format(cartSummaryValues.totalAmount),
        grandTotal: numberFormatter.format(cartSummaryValues.grandTotal),
        totalDiscount: numberFormatter.format(
          parseFloat(cartSummaryValues.totalDiscount)
        ),
      };
    });
  }, [cartItems, setCartSummary]);

  useEffect(() => {
    localStorage.setItem("finalPrice", JSON.stringify(cartSummary));
  }, [cartSummary]);

  const navigate = useNavigate();
  const handlePayment = () => {
    navigate("/payment");
    setPaymentMode(true)
  };

  return {
    darkText,
    darkBg,
    handleIncrease,
    handleDecrease,
    uniqueCart,
    cartItems,
    cartSummary,
    handlePayment
  };
};

export default useCartHook;
