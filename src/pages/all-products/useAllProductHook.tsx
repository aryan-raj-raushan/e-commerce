import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BsFilterLeft, BsGenderAmbiguous } from "react-icons/bs";
import { BiCategoryAlt, BiSolidOffer } from "react-icons/bi";
import { IoIosPricetags } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";
import myContext from "../../context/myContext";

const useAllProductHook = () => {
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
  const context = useContext(myContext);
  const navigate = useNavigate();
  const { product } = context;
  const { "*": path }: any = useParams();
  const pathSegments = path.split("/");
  const category = pathSegments[0];
  const subCategory = pathSegments[1];
  const type = pathSegments[2];
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedSorting, setSelectedSorting] = useState<any>(
    sortingOptions[0]
  );
  const [visibleProducts, setVisibleProducts] = useState(16);
  const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                                   handler                                  */
  /* -------------------------------------------------------------------------- */

  const handleSelectChange = (selectedOption: any) => {
    setSelectedSorting(selectedOption);
    let sortedProducts = [...originalProductOrder];
    switch (selectedOption.value) {
      case "feature":
        sortedProducts.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        break;
      case "priceLowToHigh":
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/,/g, ""));
          const priceB = parseFloat(b.price.replace(/,/g, ""));
          return priceA - priceB;
        });
        break;

      case "priceHighToLow":
        sortedProducts.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/,/g, ""));
          const priceB = parseFloat(b.price.replace(/,/g, ""));
          return priceB - priceA;
        });
        break;
      case "customerTopRated":
        sortedProducts.sort((a, b) => {
          const ratingA = parseFloat(a.rating);
          const ratingB = parseFloat(b.rating);

          // Handle non-numeric ratings
          if (isNaN(ratingA)) return -1;
          if (isNaN(ratingB)) return 1;

          return ratingB - ratingA;
        });
        break;
      case "bestSeller":
        sortedProducts.sort((a, b) => {
          const sellerA = parseFloat(a.totalRatings);
          const sellerB = parseFloat(b.totalRatings);
          // Handle non-numeric ratings
          if (isNaN(sellerA)) return -1;
          if (isNaN(sellerB)) return 1;

          return sellerB - sellerA;
        });
        break;
      case "newArrival":
        sortedProducts.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
        break;
      default:
        sortedProducts.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateA - dateB;
        });
        break;
    }
    setOriginalProductOrder(sortedProducts);
  };

  const handleClick = (id: any) => {
    navigate(`/productinfo/${id}`);
  };

  const showMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 8);
  };

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

  /* -------------------------------------------------------------------------- */
  /*                                   effects                                  */
  /* -------------------------------------------------------------------------- */

  const [originalProductOrder, setOriginalProductOrder] = useState<any>([]);
  useEffect(() => {
    if (product && product.length > 0) {
      let filteredProducts = product;
      if (category && category !== "*") {
        filteredProducts = filteredProducts.filter(
          (productItem: any) => productItem.allCategory.category === category
        );
      }
      if (subCategory && subCategory !== "*") {
        filteredProducts = filteredProducts.filter(
          (productItem: any) =>
            productItem.allCategory.subcategory === subCategory
        );
      }
      if (type) {
        filteredProducts = filteredProducts.filter(
          (productItem: any) => productItem.allCategory.type === type
        );
      }
      setOriginalProductOrder(filteredProducts);
    }
  }, [category, product, subCategory, type]);

  return {
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
  };
};

export default useAllProductHook;
