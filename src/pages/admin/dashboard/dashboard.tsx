import React, { useContext } from "react";
import { FaUserTie } from "react-icons/fa";
import myContext from "../../../context/myContext";
import Layout from "../../../components/layout/layout";
import DashboardTab from "./DashboardTab";
import { getCommonStyles } from "../../../HOC/hoc/HOC";

const Dashboard = () => {
  const context = useContext(myContext);
  const { mode,product,order } = context;
  const totalProducts = product.length>0 ? product.length : 0
  const totalOrder = order.length>0 ? order.length : 0
  const darkText = getCommonStyles(mode);
  const darkBg = getCommonStyles(mode, { backgroundColor: "rgb(46 49 55)" });

  const dashboardData = [
    {
      title: "Total Products",
      value: totalProducts,
    },
    {
      title: "Total Orders",
      value: totalOrder,
    },
    {
      title: "Total Users",
      value: 20,
    },
    
  ];
  return (
    <Layout>
      <section className="text-gray-600 body-font mt-10 mb-10">
        <div className="container px-5 mx-auto mb-10">
          <div className="flex flex-wrap -m-4 text-center justify-center">
            {dashboardData.map((item, index) => (
              <div key={index} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div
                  className="border-2 hover:shadow-purple-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300 px-4 py-3 rounded-xl"
                  style={darkBg}
                >
                  <div className="text-purple-500 w-12 h-12 mb-3 inline-block">
                    <FaUserTie size={50} />
                  </div>
                  <h2
                    className="title-font font-medium text-3xl text-black fonts1"
                    style={darkText}
                  >
                    {item.value}
                  </h2>
                  <p className="text-purple-500 font-bold" style={darkText}>
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <DashboardTab />
    </Layout>
  );
};

export default Dashboard;
