import React, { useContext } from "react";
import myContext from "../../../context/myContext";

const AddProduct = () => {
  const context = useContext(myContext);
  const { products, setProducts, addProduct } = context;

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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <h1 className="text-center text-white text-xl mb-4 font-bold">
          Add Product
        </h1>
        {fields.map((field: any) => (
          <div key={field.name}>
            <input
              type="text"
              name={field.name}
              onChange={handleChange}
              value={products[field.name] || ""}
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder={field.placeholder}
            />
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
  );
}

export default AddProduct;
