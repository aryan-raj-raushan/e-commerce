import { useContext, useState } from "react";
import { stateCodes } from "../../const/Const";
import { showErrorToast, showSuccessToast } from "../../HOC/hoc/HOC";
import { City } from "country-state-city";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "../../firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteFromCart } from "../../redux/cartSlice";
import myContext from "../../context/myContext";

const usePaymentHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialFormData = {
    name: "",
    fullAddress: {
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
    email: "",
    mobileNumber: "",
  };
  const context = useContext(myContext);
  const { mode, loading, setLoading, getOrderData } = context;

  const finalPriceItems = JSON.parse(
    localStorage.getItem("finalPrice") || "{}"
  );
  const finalCart = JSON.parse(localStorage.getItem("cart") || "{}");
  const cartItems = useSelector((state: any) => state.cart);

  const orderItems: any = [];
  cartItems.forEach((item: any) => {
    const existingItemIndex = orderItems.findIndex(
      (combinedItem: any) => combinedItem.id === item.id
    );
    if (existingItemIndex !== -1) {
      orderItems[existingItemIndex].quantity += 1;
    } else {
      const newItem = { ...item, quantity: 1 };
      orderItems.push(newItem);
    }
  });

  const { grandTotal, totalDiscount, totalItems, buyItem } = finalPriceItems;

  const [formData, setFormData] = useState<any>(initialFormData);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name.startsWith("fullAddress.")) {
      const subField = name.split(".")[1];
      setFormData((prevData: any) => ({
        ...prevData,
        fullAddress: {
          ...prevData.fullAddress,
          [subField]: value,
        },
      }));
    } else {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleBuy = async (item: any) => {
    console.log("itekscheck", item);
    if (
      Object.values(formData.fullAddress).some((value) => value === "") ||
      Object.values(formData)
        .filter((key) => key !== "fullAddress")
        .some((value) => value === "")
    ) {
      showErrorToast("All fields are required");
      return;
    }
    const addressInfo = { ...formData };
    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      key_secret: process.env.REACT_APP_RAZORPAY_SECRET_KEY,
      amount: Math.round(buyItem * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + formData.name,
      name: "24Seven",
      description: "for testing purpose",
      handler: async (response: any) => {
        // setLoading(true)
        showSuccessToast("Payment Successful");
        const paymentId = response.razorpay_payment_id;
        // store in firebase
        const orderInfo = {
          orderItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user") || "{}").user.email,
          userid: JSON.parse(localStorage.getItem("user") || "{}").user.uid,
          paymentId,
        };
        try {
          await addDoc(collection(firebaseDb, "orders"), orderInfo);
          setFormData(initialFormData);
          getOrderData();
          localStorage.removeItem("cart");
          localStorage.removeItem("finalPrice");
          window.location.reload();
          window.location.href = "/order";
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const pay = new (window as any).Razorpay(options);
    pay.open();
  };

  const [cityOptions, setCityOptions] = useState<any>([]);
  const [selectedState, setSelectedState] = useState("");

  const handleStateChange = (event: any) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    const stateCode = stateCodes[selectedState];
    const countryCode = "IN";
    const cities = City.getCitiesOfState(countryCode, stateCode);
    setCityOptions(
      cities.map((city: any) => ({
        value: city.name,
        displayValue: city.name,
      }))
    );
    handleChange(event);
  };

  return {
    handleBuy,
    formData,
    handleStateChange,
    handleChange,
    cityOptions,
    selectedState,
    totalItems,
    totalDiscount,
    grandTotal,
    loading,
    finalCart,
  };
};

export default usePaymentHook;
