import React from "react";
import { Watch } from "react-loader-spinner";
import { FaCamera } from "react-icons/fa";
import { CommonInputProps } from "../../../HOC/hoc/HOC";
import Navbar from "../../../components/navbar/Navbar";
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { categoryData, checkboxesColor, fields } from "../../../const/Const";
import { Link } from "react-router-dom";
import useAddProductHook from "./useAddProductHook";

const AddProduct = () => {
  const {
    products,
    addProduct,
    loading,
    selectedValues,
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedType,
    value,
    handleChange,
  } = useAddProductHook();

  return (
    <>
      <Navbar />
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
        <div className="flex justify-center w-full items-center  mt-5">
          <div className="px-2 md:px-10 py-5 rounded-xl w-full">
            <h1 className="text-start text-black text-3xl mb-4 font-bold">
              Add New Product
            </h1>
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {fields.map((field: any, index: number) => (
                <div
                  key={index}
                  className="sm:mb-4 flex items-center w-full sm:w-auto"
                >
                  {field.name === "description" ? (
                    <div className="">
                      <p className="pb-2">Description</p>
                      <textarea
                        {...CommonInputProps({
                          field,
                          handleChange,
                          products,
                        })}
                        className="border p-2 rounded w-full"
                        cols={60}
                        rows={4}
                      />
                    </div>
                  ) : field.name === "category" ? (
                    <div className="flex items-center gap-1 sm:gap-3 flex-wrap">
                      <div>
                        <p className="pb-2">Category</p>
                        <Select
                          value={selectedCategory}
                          displayEmpty
                          onChange={handleChange}
                          className="h-10 "
                          sx={{ width: 140 }}
                          name="category"
                        >
                          <MenuItem value="">Select category</MenuItem>
                          {categoryData.map((category: any, index: number) => (
                            <MenuItem key={index} value={category.label}>
                              {category.title}
                            </MenuItem>
                          ))}
                        </Select>
                      </div>

                      {selectedCategory === "fashion" && (
                        <div>
                          <p className="pb-2">Gender</p>
                          <Select
                            value={selectedSubcategory}
                            onChange={handleChange}
                            className="h-10"
                            displayEmpty
                            sx={{ width: 140 }}
                            name="subcategory"
                          >
                            <MenuItem value="">Select Gender</MenuItem>
                            {categoryData
                              .find(
                                (category: any) =>
                                  category.label === selectedCategory
                              )
                              ?.subcategories.map((sub: any, index: number) => (
                                <MenuItem key={index} value={sub.label}>
                                  {sub.title}
                                </MenuItem>
                              ))}
                          </Select>
                        </div>
                      )}

                      {selectedCategory && selectedCategory !== "fashion" && (
                        <div>
                          <p className="pb-2">Subcategory</p>
                          <Select
                            value={selectedSubcategory}
                            onChange={handleChange}
                            className="h-10"
                            displayEmpty
                            sx={{ width: 100 }}
                            name="subcategory"
                          >
                            <MenuItem value="">Select Subcategory</MenuItem>
                            {categoryData
                              .find(
                                (category: any) =>
                                  category.label === selectedCategory
                              )
                              ?.subcategories.map((sub: any, index: number) => (
                                <MenuItem key={index} value={sub}>
                                  {sub}
                                </MenuItem>
                              ))}
                          </Select>
                        </div>
                      )}
                      {selectedCategory === "fashion" &&
                        selectedSubcategory && (
                          <div>
                            <p className="pb-2">Type</p>
                            <Select
                              value={selectedType}
                              onChange={handleChange}
                              className="h-10"
                              displayEmpty
                              sx={{ width: 100 }}
                              name="type"
                            >
                              <MenuItem value="">Select Type</MenuItem>
                              {categoryData
                                .find(
                                  (category: any) =>
                                    category.label === selectedCategory
                                )
                                ?.subcategories.find(
                                  (sub: any) =>
                                    sub.label === selectedSubcategory
                                )
                                ?.subcategories.map(
                                  (type: any, index: number) => (
                                    <MenuItem key={index} value={type.label}>
                                      {type.title}
                                    </MenuItem>
                                  )
                                )}
                            </Select>
                          </div>
                        )}

                      {selectedCategory === "fashion" && selectedType && (
                        <div>
                          <p className="pb-2">
                            Available Sizes <span>(Select Multiple sizes)</span>
                          </p>
                          <Select
                            multiple
                            value={selectedSize}
                            onChange={handleChange}
                            className="h-10"
                            displayEmpty
                            name="size"
                          >
                            {categoryData
                              .find(
                                (category: any) =>
                                  category.label === selectedCategory
                              )
                              ?.subcategories.find(
                                (sub: any) => sub.label === selectedSubcategory
                              )
                              ?.subcategories.find(
                                (type: any) => type.label === selectedType
                              )
                              ?.sizes.map((size: any, index: number) => (
                                <MenuItem key={index} value={size}>
                                  {size}
                                </MenuItem>
                              ))}
                          </Select>
                        </div>
                      )}
                    </div>
                  ) : field.name.includes("imageUrl") ? (
                    <div className="">
                      <p className="text-gray-400 text-base pb-2 flex items-center">
                        <FaCamera className="mr-2 text-black" /> You can add up
                        to 5 image URLs
                      </p>
                      <div className="flex items-center flex-wrap gap-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <input
                            key={index}
                            type="text"
                            name={`imageUrl${index}`}
                            placeholder={`Image URL ${index + 1}`}
                            onChange={handleChange}
                            className="border p-2 rounded border-gray-200 w-full sm:w-auto"
                            value={
                              products.imageUrl
                                ? products.imageUrl[`imageUrl${index}`] || ""
                                : ""
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full sm:w-auto">
                      <p className="pb-2">{field.label}</p>
                      <input
                        type={field.type}
                        {...CommonInputProps({
                          field,
                          handleChange,
                          products,
                        })}
                        className="border border-gray-200 p-2 rounded w-full sm:w-auto"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div>
              <p className="pb-2 text-gray-400">
                Choose available color (if any)
              </p>
              <div className="flex items-center flex-wrap gap-2 sm:gap-4 text-lg sm:text-xl justify-between sm:justify-start">
                {checkboxesColor.map((checkbox, index) => (
                  <div key={index}>
                    <label>
                      <input
                        type="checkbox"
                        name={checkbox.value}
                        checked={selectedValues.includes(checkbox.value)}
                        onChange={handleChange}
                        className="w-4 h-4 rounded-xl mr-1"
                      />
                      {checkbox.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Check stock */}
            <div className="mt-2 flex justify-center items-center">
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="checkStock"
                  name="checkStock"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="InStock"
                    control={<Radio color="success" />}
                    label="In Stock"
                  />
                  <FormControlLabel
                    value="OutOfStock"
                    control={
                      <Radio
                        sx={{
                          color: "#AD1457",
                          "&.Mui-checked": {
                            color: "#D81B60",
                          },
                        }}
                      />
                    }
                    label="Out Of Stock"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center mt-5 mb-4 gap-2">
              <button
                onClick={addProduct}
                className="bg-success-300 w-auto text-white font-bold py-2 px-4 rounded-lg"
              >
                Add New Product
              </button>
              <Link
                to={"/dashboard"}
                className="bg-red-200 w-auto text-white font-bold py-2 px-4 rounded-lg"
              >
                Back to dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct;
