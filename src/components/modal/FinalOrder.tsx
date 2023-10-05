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
import { showErrorToast } from "../../HOC/hoc/HOC";
import { City, State } from "country-state-city";

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
    setFormData(initialFormData);
    console.log(addressInfo);
  };

  const [cityOptions, setCityOptions] = useState<any>([]);
  const [selectedState, setSelectedState] = useState("");

  const handleStateChange = (event: any) => {
    const selectedState = event.target.value;
    setSelectedState(selectedState);
    const stateCode = stateCodes[selectedState];
    console.log(stateCode);
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
        <div className="flex flex-col md:flex-row gap-4">
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
                              >
                                {cityOptions.map((city: any, index: number) => (
                                  <MenuItem key={index} value={city.value}>
                                    {city.displayValue}
                                  </MenuItem>
                                ))}
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
                  <button
                    type="button"
                    onClick={handleBuy}
                    className="focus:outline-none w-full mt-4 text-white bg-violet-600 hover:bg-violet-800 outline-0 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Order Now
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="mb-4 w-full md:w-1/3">
            <div className="bg-white shadow-md rounded-md">
              <div className="p-4">
                <h5 className="text-lg font-semibold mb-4">Summary</h5>
                <ul className="list-group">
                  <li className="list-group-item justify-between border-0 px-0 pb-0">
                    <span>Products</span>
                    <span className="font-semibold">$53.98</span>
                  </li>
                  <li className="list-group-item justify-between px-0">
                    <span>Shipping</span>
                    <span className="font-semibold">Gratis</span>
                  </li>
                  <li className="list-group-item justify-between border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount</strong>
                      <p className="mb-0">(including VAT)</p>
                    </div>
                    <span>
                      <strong>$53.98</strong>
                    </span>
                  </li>
                </ul>
                <button className="btn bg-blue-500 text-white mt-4 w-full py-2">
                  Make purchase
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
