import React, { useContext, useState } from "react";
// import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import {
  AiFillShopping,
  // AiFillPlusCircle,
  // AiFillDelete,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import myContext from "../../../context/myContext";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Product from "./tabs/Product";
import Order from "./tabs/Order";
import User from "./tabs/User";

const DashboardTab = () => {
  const context = useContext(myContext);
  const { mode } = context;
  // let [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  // const handleOpen = () => {
  //   setIsOpen(!isOpen);
  // };  
  const tabsData = [
    {
      icon: <AiOutlineShoppingCart />,
      label: "Products",
      color: "purple",
    },
    {
      icon: <AiFillShopping />,
      label: "Order",
      color: "pink",
    },
    {
      icon: <FaUser />,
      label: "Users",
      color: "green",
    },
  ];

  const tabComp = [
    { component: <Product mode={mode} /> },
    { component: <Order mode={mode} /> },
    { component: <User mode={mode} /> },
  ];

  return (
    <>
      <div className="container mx-auto">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0} className=" ">
            <TabList className="md:flex md:space-x-8 bg-grid grid-cols-2 text-center gap-4 md:justify-center mb-10">
              {tabsData.map((tab, index) => (
                <Tab key={index}>
                  <button
                    type="button"
                    className={`font-medium border-b-2 border-${
                      tab.color
                    }-500 bg-[#605d5d12] text-${
                      tab.color
                    }-500 rounded-lg text-xl hover:shadow-${
                      tab.color
                    }-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center ${
                      selectedTab === index ? `bg-${tab.color}-100` : ""
                    }`}
                    onClick={() => setSelectedTab(index)}
                  >
                    <div className="flex gap-2 items-center">
                      {tab.icon}
                      {tab.label}
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
    </>
  );
};

export default DashboardTab;
