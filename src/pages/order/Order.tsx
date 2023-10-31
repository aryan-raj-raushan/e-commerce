import React, { useContext } from "react";
import Loader from "../../components/loader/Loader";
import myContext from "../../context/myContext";
import Layout from "../../components/layout/layout";
import { getCommonStyles } from "../../HOC/hoc/HOC";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user") || "").user.uid;
  const context = useContext(myContext);
  const { mode, loading, order } = context;
  const darkText = getCommonStyles(mode);
  const darkBg = getCommonStyles(mode, { backgroundColor: "#282c34" });
  return (
    <Layout>
      {loading && <Loader />}
      {order.length > 0 ? (
        <>
          <div className=" h-full pt-10">
            {order
              .filter((obj: any) => obj.userid === userid)
              .map((order: any, index:number) => {
                console.log("order",order)
                return (
                  <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0" key={index}>
                    {order.cartItems.map((item: any, index:number) => {
                      console.log(item)
                      return (
                        <div className="rounded-lg md:w-2/3" key={index}>
                          <div
                            className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                            style={darkBg}
                          >
                            <img
                              src={item.imageUrl.imageUrl0}
                              alt={item.title}
                              className="w-full rounded-lg sm:w-40"
                            />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                              <div className="mt-5 sm:mt-0">
                                <h2
                                  className="text-lg font-bold text-gray-900"
                                  style={darkText}
                                >
                                  {item.title}
                                </h2>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={darkText}
                                >
                                  {item.description}
                                </p>
                                <p
                                  className="mt-1 text-xs text-gray-700"
                                  style={darkText}
                                >
                                  {item.price}
                                </p>
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
        <h2 className=" text-center tex-2xl text-white">Not Order</h2>
      )}
    </Layout>
  );
}

export default Order;
