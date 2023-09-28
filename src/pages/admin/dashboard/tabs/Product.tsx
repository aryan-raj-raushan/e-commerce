import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const productDetails = [
  {
    id: 1,
    imageSrc: "https://dummyimage.com/720x400",
    title: "Title",
    price: "₹100",
    category: "pots",
    date: "12 Aug 2019",
  },
  // Add more data objects as needed
];
const columns = [
  { key: "id", label: "S.No" },
  { key: "imageSrc", label: "Image", isImage: true },
  { key: "title", label: "Title" },
  { key: "price", label: "Price" },
  { key: "category", label: "Category" },
  { key: "date", label: "Date" },
];

const Product = ({ mode }: any) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/addproduct");
  };
  return (
    <div className="px-4 md:px-0 mb-16">
      <h1
        className="text-center mb-5 text-3xl font-semibold underline"
        style={{ color: mode === "dark" ? "white" : "" }}
      >
        Product Details
      </h1>
      <div className="flex justify-end">
        <button
          onClick={handleClick}
          type="button"
          className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          style={{
            backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          {" "}
          <div className="flex gap-2 items-center">
            Add Product <FaCartPlus size={20} />
          </div>
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
            style={{
              backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="px-6 py-3">
                  {column.label}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {productDetails.map((item: any, index: number) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : ""
                } border-b  dark:border-gray-700`}
                style={{
                  backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`px-6 py-4 text-black ${
                      column.isImage ? "font-medium whitespace-nowrap" : ""
                    } ${mode === "dark" ? "text-white" : ""}`}
                  >
                    {column.isImage ? (
                      <img className="w-16" src={item[column.key]} alt="img" />
                    ) : (
                      item[column.key]
                    )}
                  </td>
                ))}
                <td className="px-6 py-4">
                  <div className=" flex gap-2 items-center">
                    <div
                      className=" flex gap-2 cursor-pointer text-black"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      <div className="hover:scale-110">
                        <AiOutlineDelete size={25} />
                      </div>
                      <div className="hover:scale-110">
                        <FiEdit size={22} />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;
