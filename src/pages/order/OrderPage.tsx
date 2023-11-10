import React, { useContext } from "react";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import Layout from "../../components/layout/layout";
import { getCommonStyles } from "../../HOC/hoc/HOC";
import { Slider } from "@mui/joy";
import moment from "moment";

const OrderPage = () => {
  const userid = JSON.parse(localStorage.getItem("user") || "").user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;
  const darkText = getCommonStyles(mode);
  const darkBg = getCommonStyles(mode, { backgroundColor: "#282c34" });

  const orderStatus = [
    {
      value: 0,
      label: "Ordered",
    },
    {
      value: 1,
      label: "Shipped",
    },
    {
      value: 2,
      label: "Out For Delivery",
    },
    {
      value: 3,
      label: "Delivered",
    },
  ];

  const valueText = (value: number) => {
    switch (value) {
      case 0:
        return "Ordered";
      case 1:
        return "Shipped";
      case 2:
        return "Delivered";
      default:
        return "";
    }
  };
  const styles = {
    root: {
      color: "green",
      height: 4,
    },
    thumb: {
      display: "#3399cc",
    },
    track: {
      height: 4,
    },
  };

  const getDeliveryStatus = (orderDate: any, deliveryDate: any) => {
    const deliverDate = moment(orderDate)
      .add(deliveryDate, "days")
      .format("ll");
    const currentDate = moment();
    const differenceInDays = moment(deliverDate).diff(currentDate, "days");

    switch (true) {
      case differenceInDays === 0:
        return { status: "Out for delivery", value: 2 };
      case differenceInDays < 7:
        return {
          status: `Deliver on ${moment(deliverDate).format("dddd")}`,
          value: 1,
        };
      case differenceInDays >= 7:
        return {
          status: `Deliver on ${moment(deliverDate).format("Do MMM")}`,
          value: 1,
        };
      case differenceInDays === -1:
        return { status: "Delivered yesterday", value: 3 };
      case differenceInDays < -1:
        return {
          status: `Delivered on ${moment(deliverDate).format("Do MMM")}`,
          value: 3,
        };
      default:
        return {
          status: `Deliver on ${moment(deliverDate).format("Do MMM")}`,
          value: 0,
        };
    }
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <>
          {order.length > 0 ? (
            <>
              <h2 className="text-2xl font-medium text-black pt-5 pb-3 px-10">
                Your order
              </h2>
              <hr />
              <div className=" h-full pt-5">
                {order
                  .filter((obj: any) => obj.userid === userid)
                  .map((order: any, index: number) => {
                    const orderDate = order.date;
                    return (
                      <div
                        className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 space-y-4"
                        key={index}
                      >
                        {order.orderItems.map((item: any, index: number) => {
                          const deliveryDate = item.deliveryTime;
                          console.log(item)
                          const store = item.storeLocation
                          const quantity = item.quantity
                          const todayDate = moment().format("ll");
                          const { status, value } = getDeliveryStatus(
                            orderDate,
                            deliveryDate
                          );
                          const track = orderDate === todayDate ? 0 : value;
                          return (
                            <div className="rounded-lg md:w-2/3" key={index}>
                              <div
                                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-lg border border-gray-200 sm:flex sm:justify-start w-full"
                                style={darkBg}
                              >
                                <img
                                  src={item.imageUrl.imageUrl0}
                                  alt={item.title}
                                  className="w-full rounded-lg sm:w-40 object-contain"
                                />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                  <div className="mt-5 sm:mt-0 sm:w-full">
                                    <h2
                                      className="text-lg font-normal leading-6 text-gray-900"
                                      style={darkText}
                                    >
                                      {item.title}
                                    </h2>
                                    <div
                                      className="mt-1 text-lg font-semibold text-gray-700 flex items-center"
                                      style={darkText}
                                    >
                                      <p> ₹{item.price}</p>{" "}
                                      <span className="px-2">|</span>
                                      <p className="text-lg">Quantity : {quantity}</p>
                                      <span className="px-2">|</span>
                                      <p className="text-lg">{status}</p>
                                    </div>
                                    <p className="pt-1">Product shipped from : <span className="font-medium">{store}</span> </p>
                                    <div className="mx-5">
                                      <Slider
                                        aria-label="Order status"
                                        value={track}
                                        getAriaValueText={valueText}
                                        step={1}
                                        marks={orderStatus}
                                        valueLabelDisplay="off"
                                        min={0}
                                        max={3}
                                        sx={styles}
                                        color="success"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <h2 className=" text-center tex-2xl text-white">No any Order</h2>
          )}
        </>
      )}
    </Layout>
  );
};

export default OrderPage;
