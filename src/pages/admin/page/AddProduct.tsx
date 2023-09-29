import React, { useContext } from "react";
import myContext from "../../../context/myContext";
import { Watch } from "react-loader-spinner";
import { CommonInputProps } from "../../../HOC/hoc/HOC";

const AddProduct = () => {
  const context = useContext(myContext);
  const { products, setProducts, addProduct, loading } = context;

  const fields: any = [
    { name: "title", placeholder: "Product title" },
    { name: "price", placeholder: "Product price" },
    { name: "imageUrl", placeholder: "Product imageUrl" },
    { name: "category", placeholder: "Product category" },
    { name: "description", placeholder: "Product description" },
  ];

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  };

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
        <div className="flex justify-center items-center h-screen">
          <div className="bg-gray-800 px-10 py-10 rounded-xl">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Add Product
            </h1>
            {fields.map((field: any) => (
              <div key={field.name}>
                {field.name === "description" ? ( // Check if it's the 'description' field
                  <textarea {...CommonInputProps({field,handleChange,products})} cols={30} rows={8} />
                ) : (
                  <input type="text" {...CommonInputProps({field,handleChange,products})} />
                )}
              </div>
            ))}
            <div className="flex justify-center mb-3">
              <button
                onClick={addProduct}
                className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
