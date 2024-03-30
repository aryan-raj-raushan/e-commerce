import React from "react";
import { FaCartPlus } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const columns = [
  { key: "imageUrl", label: "Image", isImage: true },
  { key: "title", label: "Title" },
  { key: "price", label: "Price" },
  { key: "allCategory", label: "Category" },
  { key: "date", label: "Date" },
];

const Product = ({
  mode,
  data,
  edithandle,
  deleteProduct,
  darkBg,
  darkText,
}: any) => {
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("/addproduct");
  };
  const handleEdit = (item: any) => {
    edithandle(item);
    navigate("/updateproduct");
  };
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdminLogin = user?.user?.email
    .toLowerCase()
    .includes("aryanraj.raushan")
    ? true
    : false;

  return (
    <div className="px-4 md:px-0 mb-16">
      <h1
        className="text-center mb-5 text-3xl font-semibold underline"
        style={darkText}
      >
        Product Details
      </h1>
      <div className="flex justify-end">
        <button
          onClick={handleAddProduct}
          type="button"
          className="focus:outline-none text-white bg-pink-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          style={darkBg}
        >
          {" "}
          <div className="flex gap-2 items-center">
            Add Product <FaCartPlus size={20} />
          </div>
        </button>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead
            className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
            style={darkBg}
          >
            <tr>
              <th scope="col" className="px-6 py-3">
                S.No.
              </th>

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
            {data.map((item: any, index: number) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : ""
                } border-b  dark:border-gray-700`}
                style={darkBg}
              >
                <td className="px-6 py-4 text-black " style={darkText}>
                  {index + 1}.
                </td>
                {columns.map((column: any) => {
                  return (
                    <td
                      key={column.key}
                      className={`px-6 py-4 text-black text-start font-normal  ${
                        column.isImage ? "font-normal whitespace-nowrap" : ""
                      } ${mode === "dark" ? "text-white" : ""}`}
                    >
                      {column.key === "imageUrl" && column.isImage ? (
                        <img
                          className="w-16"
                          src={item.imageUrl.imageUrl0}
                          alt="img"
                        />
                      ) : column.key === "allCategory" ? (
                        <p className="capitalize">
                          {item.allCategory.category} -{" "}
                          {item.allCategory.subcategory}
                        </p>
                      ) : (
                        item[column.key]
                      )}
                    </td>
                  );
                })}
                <td className="px-6 py-4">
                  <div className=" flex gap-2 items-center">
                    <div
                      className=" flex gap-2 cursor-pointer text-black"
                      style={darkText}
                    >
                      {isAdminLogin && (
                        <div
                          className="hover:scale-110"
                          onClick={() => deleteProduct(item)}
                        >
                          <AiOutlineDelete size={25} />
                        </div>
                      )}
                      <div
                        className="hover:scale-110"
                        onClick={() => handleEdit(item)}
                      >
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
