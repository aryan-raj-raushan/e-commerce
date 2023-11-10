import React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Select,
} from "@mui/material";
import { buyingData } from "../../const/Const";
import { State } from "country-state-city";
import Layout from "../../components/layout/layout";
import usePaymentHook from "./usePaymentHook";
import { Watch } from "react-loader-spinner";

const Payment = () => {
  const {
    handleBuy,
    formData,
    handleStateChange,
    handleChange,
    cityOptions,
    selectedState,
    totalItems,
    totalDiscount,
    grandTotal,
    finalCart,
    loading,
  } = usePaymentHook();

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Watch
            height="160"
            width="160"
            radius="48"
            color="#4fa94d"
            ariaLabel="watch-loading"
            wrapperClass=""
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      ) : (
        <Layout showFull={false} className={false}>
          <div className="mx-auto mt-5 max-w-4xl min-h-[516px]">
            <div className="flex flex-col md:flex-row md:gap-8">
              <div className="mb-4 w-full md:w-2/3">
                <div className="bg-white shadow-md rounded-md">
                  <div className="p-6">
                    <h5 className="text-lg font-semibold mb-2">
                      Billing Address
                    </h5>
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
                                        <MenuItem
                                          key={index}
                                          value={state.name}
                                        >
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
                                            <MenuItem
                                              key="notDeliverable"
                                              value=""
                                            >
                                              Your area is not deliverable. We
                                              will be reaching soon to your
                                              address.
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
                      onClick={() => handleBuy(finalCart)}
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
      )}
    </>
  );
};

export default Payment;
