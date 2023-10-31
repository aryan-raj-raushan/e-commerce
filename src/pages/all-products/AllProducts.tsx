import { useParams } from "react-router-dom";
import Layout from "../../components/layout/layout";
import FilterMenu from "./Filter";
import { useEffect, useState } from "react";
import SortSelect from "../../HOC/hoc/Select";
import { BsFilterLeft, BsGenderAmbiguous } from "react-icons/bs";
import { BiCategoryAlt, BiSolidOffer } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";
import { Rating } from "@mui/material";
import FreeDelivery from "../../assets/svg/free-delivery-icon.svg";

const AllProducts = () => {
  const sortingOptions = [
    { value: "feature", label: "Feature Item" },
    { value: "priceLowToHigh", label: "Price Low to High" },
    { value: "priceHighToLow", label: "Price High to Low" },
    { value: "customerTopRated", label: "Customer Top Rated" },
    { value: "bestSeller", label: "Best Seller" },
    { value: "newArrival", label: "New Arrival" },
  ];
  const filters = [
    { name: "All Filters", icon: <BsFilterLeft />, value: "allFilters" },
    { name: "Offers", icon: <BiSolidOffer />, value: "offers" },
    { name: "Category", icon: <BiCategoryAlt />, value: "category" },
    { name: "Price", icon: <IoIosPricetags />, value: "price" },
    { name: "Gender", icon: <BsGenderAmbiguous />, value: "gender" },
    { name: "Discount", icon: <CiDiscount1 />, value: "discount" },
  ];
  const { "*": path }: any = useParams();
  const pathSegments = path.split("/");
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSorting, setSelectedSorting] = useState<any>(
    sortingOptions[0]
  );
  const [visibleProducts, setVisibleProducts] = useState(16);

  const showMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 5);
  };

  useEffect(() => {
    // Fetch data and then apply sorting
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        // Apply sorting here
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  // console.log("check 1",products,[...products])
  const handleFilterMenu = (e: any) => {
    setOpen(!open);
    setTimeout(() => {
      setSelectedCategory(e);
    }, 800);
  };

  const handleFilterClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSelectedSorting(null);
  };

  const handleSelectChange = (selectedOption: any) => {
    setSelectedSorting(selectedOption);
    let sortedProducts = [...products];
    switch (selectedOption.value) {
      case "priceLowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      // Add cases for other sorting options as needed.
    }
    setProducts(sortedProducts); // Update the sorted products.
  };

  // const filterAndSortProducts = () => {
  //   let filteredProducts = [...products];
  //   selectedFilters.forEach((filter) => {
  //     switch (filter) {
  //       case "price":
  //         filteredProducts = filteredProducts.filter((product) => {
  //           return product.price >= 0 && product.price <= 200;
  //         });
  //         break;
  //       case "category":
  //         if (selectedCategory) {
  //           filteredProducts = filteredProducts.filter((product) => {
  //             return product.category === selectedCategory;
  //           });
  //         }
  //         break;
  //       // Add additional cases for other filters (e.g., 'gender', 'discount', 'size', etc.)
  //     }
  //   });

  //   // Apply sorting option if selected
  //   // if (selectedSorting) {
  //   //   switch (selectedSorting) {
  //   //     case "priceLowToHigh":
  //   //       filteredProducts.sort((a, b) => a.price - b.price);
  //   //       break;
  //   //     case "priceHighToLow":
  //   //       filteredProducts.sort((a, b) => b.price - a.price);
  //   //       break;
  //   //     // Add cases for other sorting options as needed.
  //   //   }
  //   // }

  //   return filteredProducts;
  // };

  // const filteredProducts = filterAndSortProducts();
  // useEffect(() => {
  //   filterAndSortProducts();
  // }, []);

  return (
    <Layout>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 gap-5 px-10 pb-5">
          {products.slice(0, visibleProducts).map((product: any) => (
            <div
              className="flex flex-col items-stretch justify-between gap-2 min-h-[300px] max-h-[500px] p-2 lg:w-full"
              key={product.id}
            >
              <div className="bg-contain bg-no-repeat object-contain bg-center w-full flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={100}
                  className="h-56 rounded-xl"
                />
              </div>
              <div className="flex flex-col items-start text-start">
                <h2 className="text-lg font-normal text-gray-800">
                  {product.title}
                </h2>
                <h4 className="text-sm text-gray-500 font-normal truncate w-full">
                  {product.description}
                </h4>
                <h2 className="text-lg font-semibold text-black py-1">
                  ₹{product.price}
                </h2>
                <div className="flex items-center gap-1">
                  <Rating name="read-only" value={3} readOnly /> (4)
                </div>
                <div className="pt-2 px-1 flex items-center gap-2">
                  {" "}
                  <img src={FreeDelivery} alt="" className="w-10 h-6" />
                  <p className="bg-green-200 py-1 px-4 rounded-full">
                    Delivery in 2 days
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {visibleProducts < products.length && (
          <div className="flex items-center justify-center mb-5">
            <button
              onClick={showMoreProducts}
              className=" text-black px-4 py-1 rounded-md text-lg bg-indigo-200"
            >
              Show More
            </button>
          </div>
        )}
      </div>
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

// const pathArray = pathSegments.map((segment:any, index:number) => `segment${index}`);
// console.log("patharray", pathArray);
// const pathObject: any = {};
// pathSegments.forEach((segment: any, index: number) => {
//   pathObject[`segment${index}`] = segment;
// });
// console.log("pathobj:", pathObject);
