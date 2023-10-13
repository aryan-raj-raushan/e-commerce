import React, { useState } from "react";
import Layout from "../layout/layout";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import { buyingData, stateCodes } from "../../const/Const";
import { showErrorToast, showSuccessToast } from "../../HOC/hoc/HOC";
import { City, State } from "country-state-city";
import { addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "../../firebase/firebase.config";
import { useSelector } from "react-redux";
const FinalOrder = () => {
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

  const finalPriceItems = JSON.parse(localStorage.getItem('finalPrice') || "{}");
  const cartItems = useSelector((state: any) => state.cart);

  const {grandTotal,totalDiscount, totalItems, buyItem} = finalPriceItems
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
      key: "rzp_test_1twO1LimQ1DymK",
      key_secret: "diAu4olPzsEQNVg87U2kSImD",
      amount: buyItem*100,
      currency: "INR",
      order_receipt: 'order_rcptid_' + formData.name,
      name: "E-Bharat",
      description: "for testing purpose",
      handler: (response: any) => {
        showSuccessToast('Payment Successful')
        const paymentId = response.razorpay_payment_id
        // store in firebase 
        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user") || "{}").user.email,
          userid: JSON.parse(localStorage.getItem("user") || "{}").user.uid,
          paymentId
        }
        try {
          const orderData = addDoc(collection(firebaseDb, "orders"), orderInfo)
          setFormData(initialFormData);
        } catch (error) {
          console.log(error)
        }
      },
      theme: {
        color: "#3399cc"
      }
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

  return (
    <Layout showFull={false} className={false}>
      <div className="mx-auto mt-5 max-w-4xl min-h-[516px]">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="mb-4 w-full md:w-2/3">
            <div className="bg-white shadow-md rounded-md">
              <div className="p-6">
                <h5 className="text-lg font-semibold mb-2">Billing Address</h5>
                <form onSubmit={handleBuy}>
                  <Grid container spacing={2}>
                    {buyingData.map((field, index) => {
                      return (
                        <Grid item xs={12} md={field.md} key={index}>
                          {field.name === "state" && (
                            <FormControl fullWidth>
                              <InputLabel htmlFor="state">State</InputLabel>
                              <Select
                                id="state"
                                name="fullAddress.state" // Update the name to include fullAddress
                                value={formData.fullAddress.state} // Access the state within fullAddress
                                onChange={handleStateChange}
                              >
                                {State.getStatesOfCountry("IN").map(
                                  (state: any, index: number) => (
                                    <MenuItem key={index} value={state.name}>
                                      {state.name}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          )}
                          {field.name === "city" && (
                            <FormControl fullWidth>
                              <InputLabel htmlFor="city">City</InputLabel>
                              <Select
                                id="city"
                                name="fullAddress.city"
                                value={formData.fullAddress.city}
                                onChange={handleChange}
                                style={{ whiteSpace: "normal" }}
                              >
                                {cityOptions.length === 0
                                  ? selectedState
                                    ? [
                                        // Use square brackets to create an array
                                        <MenuItem key="notDeliverable" value="">
                                          Your area is not deliverable. We will
                                          be reaching soon to your address.
                                        </MenuItem>,
                                      ]
                                    : [
                                        // Use square brackets to create an array
                                        <MenuItem
                                          key="selectStateFirst"
                                          value=""
                                        >
                                          Please Select State First.
                                        </MenuItem>,
                                      ]
                                  : cityOptions.map(
                                      (city: any, index: number) => (
                                        <MenuItem
                                          key={index}
                                          value={city.value}
                                        >
                                          {city.displayValue}
                                        </MenuItem>
                                      )
                                    )}
                              </Select>
                            </FormControl>
                          )}
                          {(field.name === "address" ||
                            field.name === "pincode") && (
                            <TextField
                              label={field.label}
                              variant="outlined"
                              fullWidth
                              //   margin="normal"
                              name={`fullAddress.${field.name}`}
                              value={formData.fullAddress[field.name]}
                              onChange={handleChange}
                              type={field.type}
                            />
                          )}
                          {field.name !== "state" &&
                            field.name !== "city" &&
                            field.name !== "address" &&
                            field.name !== "pincode" && (
                              <TextField
                                label={field.label}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                type={field.type}
                              />
                            )}
                        </Grid>
                      );
                    })}
                  </Grid>
                </form>
              </div>
            </div>
          </div>

          <div className="mb-4 w-full md:w-1/3">
            <div className="bg-white shadow-md rounded-md">
              <div className="px-8 py-4">
                <h5 className="text-lg font-semibold text-gray-800 pb-3">
                  Summary
                </h5>
                <ul className="list-group">
                  <li className="list-group-item justify-between border-b-2 border-gray-200 py-2 flex items-center">
                    <p className="text-gray-600">Total items</p>
                    <p className="font-semibold text-gray-800 ">
                      {totalItems}
                    </p>
                  </li>
                  <li className="list-group-item justify-between border-b-2 border-gray-200 py-2 flex">
                    <p>
                      <span className="text-gray-600">Total</span>
                      <span className="font-semibold text-gray-800">
                        Savings
                      </span>
                    </p>

                    <p className="font-semibold text-green-600 ">
                      ₹{totalDiscount}
                    </p>
                  </li>
                  <li className="list-group-item justify-between py-2 flex">
                    <div>
                      <span className="text-gray-600">
                        Final Price (inc. GST)
                      </span>
                    </div>
                    <p className="font-semibold text-gray-800 text-right">
                      ₹{grandTotal}
                    </p>
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={handleBuy}
                  className="focus:outline-none w-full mt-4 text-white bg-violet-600 hover:bg-violet-800 outline-0 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Proceed to pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FinalOrder;
