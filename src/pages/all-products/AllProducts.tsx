import React from "react";
import Layout from "../../components/layout/layout";
import FilterMenu from "./Filter";
import SortSelect from "../../HOC/hoc/Select";
import { Rating } from "@mui/material";
import FreeDelivery from "../../assets/svg/free-delivery-icon.svg";
import useAllProductHook from "./useAllProductHook";
import { BsFilterLeft } from "react-icons/bs";
import { ReactComponent as DoubleArrowDown } from "../../assets/svg/double-chevrons-up.svg";

const AllProducts = () => {
  const {
    filters,
    handleFilterMenu,
    sortingOptions,
    selectedSorting,
    handleSelectChange,
    originalProductOrder,
    visibleProducts,
    handleClick,
    showMoreProducts,
    open,
    setOpen,
    selectedCategory,
    setSelectedCategory,
    handleFilterClose,
    loading,
  } = useAllProductHook();

  return (
    <Layout>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          Loading,,,,
        </div>
      ) : (
        <div className="">
          {/* Filter menu  */}
          <div className="flex items-center my-5 md:px-10 pb-5 border-b justify-start md:justify-between">
            <div className="lg:flex items-center flex-wrap gap-1 md:gap-3 hidden">
              {filters.map((filter, index) => (
                <div
                  key={index}
                  onClick={() => handleFilterMenu(filter.value)}
                  className="flex flex-wrap items-center gap-2 px-4 py-2 border border-gray-400 rounded-full text-sm font-normal cursor-pointer min-w-[120px]"
                >
                  {filter.icon}
                  <p>{filter.name}</p>
                </div>
              ))}
            </div>
            <div
              className="lg:hidden flex items-center px-3 py-2 gap-1 border border-gray-400 rounded-3xl text-sm font-normal cursor-pointer min-w-[80px] ml-4"
              onClick={handleFilterMenu}
            >
              <BsFilterLeft />
              Filter
            </div>
            <div className="flex items-center w-full lg:w-1/4 justify-end gap-2">
              <p className="hidden md:block">Sort by |</p>
              <SortSelect
                data={sortingOptions}
                handleSelectChange={handleSelectChange}
                selectedSorting={selectedSorting}
              />
            </div>
          </div>

          {/* filter product */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-5 px-10 pb-10">
            {originalProductOrder
              .slice(0, visibleProducts)
              .map((products: any) => {
                const {
                  title,
                  totalRatings,
                  imageUrl,
                  price,
                  description,
                  rating,
                  deliveryTime,
                  id,
                } = products;
                let totalAmount = 0;
                originalProductOrder.forEach((cartItem: any) => {
                  const priceWithoutCommas =
                    cartItem.price && cartItem.price.replace(/,/g, "");
                  const priceAsFloat = parseFloat(priceWithoutCommas);
                  if (!isNaN(priceAsFloat)) {
                    totalAmount += priceAsFloat;
                  }
                });
                const prices = totalAmount;
                const ratingAsNumber = Number(rating);
                return (
                  <div
                    className="flex flex-col items-stretch justify-between gap-2 min-h-[300px] max-h-[500px] p-2 lg:w-full cursor-pointer"
                    key={id}
                    onClick={() => handleClick(id)}
                  >
                    <div className="bg-contain bg-no-repeat object-contain bg-center w-full flex items-center justify-center">
                      <img
                        src={imageUrl.imageUrl0}
                        alt={title}
                        width={200}
                        height={100}
                        className="h-56 rounded-xl object-contain w-full"
                        style={{ backgroundSize: "100% 100%" }}
                      />
                    </div>
                    <div className="flex flex-col items-start text-start">
                      <h2 className="text-lg font-normal text-gray-800">
                        {title}
                      </h2>
                      <h4 className="text-sm text-gray-500 font-normal truncate w-full">
                        {description}
                      </h4>
                      <h2 className="text-lg font-semibold text-black py-1">
                        ₹{price}
                      </h2>
                      {rating && totalRatings && (
                        <div className="flex items-center gap-1 text-sm">
                          <Rating
                            name="half-rating-read"
                            defaultValue={ratingAsNumber}
                            precision={0.5}
                            readOnly
                            size="small"
                          />{" "}
                          ({totalRatings})
                        </div>
                      )}

                      {deliveryTime > 0 && (
                        <div className="pt-2 px-1 flex items-center gap-2">
                          {" "}
                          {prices > 500 && (
                            <img
                              src={FreeDelivery}
                              alt=""
                              className="w-10 h-6"
                            />
                          )}
                          <p className="bg-green-200 py-1 px-4 rounded-full">
                            Delivery in {deliveryTime} days
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
          {visibleProducts < originalProductOrder.length && (
            <div className="flex items-center justify-center mb-8">
              <div
                onClick={showMoreProducts}
                className=" text-blue-700 font-normal px-10 py-2 rounded-lg text-xl bg-white border text-center flex items-center gap-1 shadow-inner drop-shadow cursor-pointer"
              >
                Show More{" "}
                <DoubleArrowDown className="rotate-180 text-lg h-10 w-6" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Side filter menu */}
      <FilterMenu
        mode="light"
        open={open}
        setOpen={setOpen}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        handleFilterClose={handleFilterClose}
      />
    </Layout>
  );
};

export default AllProducts;
