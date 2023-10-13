import { useState } from "react";
import { stateCodes } from "../../const/Const";
import { showErrorToast, showSuccessToast } from "../../HOC/hoc/HOC";
import { City } from "country-state-city";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "../../firebase/firebase.config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const usePaymentHook = () => {
    const navigate = useNavigate()
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
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };

  const finalPriceItems = JSON.parse(
    localStorage.getItem("finalPrice") || "{}"
  );
  const cartItems = useSelector((state: any) => state.cart);

  const { grandTotal, totalDiscount, totalItems, buyItem } = finalPriceItems;
  console.log(buyItem)

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

  const handleBuy = async (e: any) => {
    console.log("purchase",buyItem)
    e.preventDefault();
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
      name: "E-Bharat",
      description: "for testing purpose",
      handler: (response: any) => {
        showSuccessToast("Payment Successful");
        const paymentId = response.razorpay_payment_id;
        // store in firebase
        const orderInfo = {
          cartItems,
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
          const orderData = addDoc(collection(firebaseDb, "orders"), orderInfo);
          setFormData(initialFormData);
        //   localStorage.removeItem('finalPrice');
        //   localStorage.removeItem('cart');
          navigate("/order")
        } catch (error) {
          console.log(error);
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
  };
};

export default usePaymentHook;
