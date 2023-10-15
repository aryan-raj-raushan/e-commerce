import React, { useContext, useState } from "react";
import myContext from "../../../context/myContext";
import Layout from "../../../components/layout/layout";
import { getCommonStyles } from "../../../HOC/hoc/HOC";
// import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import {
  AiFillShopping,
  // AiFillPlusCircle,
  // AiFillDelete,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Product from "./tabs/Product";
import Order from "./tabs/Order";
import User from "./tabs/User";

const Dashboard = () => {
  const context = useContext(myContext);
  const { mode, product, loading, edithandle, deleteProduct, order, userData } =
    context;
  const totalProducts = product.length > 0 ? product.length : 0;
  const totalOrder = order.length > 0 ? order.length : 0;
  const darkText = getCommonStyles(mode);
  const darkBg = getCommonStyles(mode, { backgroundColor: "rgb(46 49 55)" });

  const [selectedTab, setSelectedTab] = useState(0);

  const tabsData = [
    {
      icon: <AiOutlineShoppingCart />,
      label: "Products",
      color: "purple",
      value: totalProducts,
    },
    {
      icon: <AiFillShopping />,
      label: "Order",
      color: "pink",
      value: totalOrder,
    },
    {
      icon: <FaUser />,
      label: "Users",
      color: "green",
      value: 20,
    },
  ];

  const tabComp = [
    {
      component: (
        <Product
          mode={mode}
          data={product}
          loading={loading}
          edithandle={edithandle}
          deleteProduct={deleteProduct}
          darkBg={darkBg}
          darkText={darkText}
        />
      ),
    },
    {
      component: (
        <Order
          mode={mode}
          orderDetails={order}
          darkBg={darkBg}
          darkText={darkText}
        />
      ),
    },
    {
      component: (
        <User
          mode={mode}
          userData={userData}
          darkBg={darkBg}
          darkText={darkText}
        />
      ),
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto my-6 sm:my-10">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0} className=" ">
            <TabList className="flex w-full sm:flex-row md:space-x-8 bg-grid grid-cols-2 text-center gap-2 sm:gap-4 items-center justify-center pb-5 sm:pb-10 ">
              {tabsData.map((tab, index) => (
                <Tab key={index}>
                  <button
                    type="button"
                    className={`font-medium border-b-2 bg-[#605d5d12] w-full text-${
                      tab.color
                    }-500 rounded-lg text-base sm:text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-2 sm:px-5 py-1.5 text-center hover:shadow-${
                      tab.color
                    }-600 bg-gray-100 border-gray-300 ${
                      selectedTab === index
                        ? `border-${tab.color}-500`
                        : "border-gray-100"
                    }`}
                    onClick={() => setSelectedTab(index)}
                  >
                    <div className="flex gap-2 items-center">
                      {tab.icon}
                      {tab.label}
                      {tab.value > 100 ? (
                        <span>99+</span>
                      ) : tab.value > 0 ? (
                        <span> ({tab.value})</span>
                      ) : null}
                    </div>
                  </button>
                </Tab>
              ))}
            </TabList>
            {tabComp.map((tab, index) => (
              <TabPanel key={index}>{tab.component}</TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
