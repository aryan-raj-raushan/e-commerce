import { useContext } from "react";
import myContext from "../../../context/myContext";

const useAddProductHook = () => {
  const context = useContext(myContext);
  const {
    products,
    setProducts,
    addProduct,
    loading,
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedType,
    selectedValues,
    value,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedSize,
    setSelectedType,
    setSelectedValues,
    setValue,
  } = context;

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    if (name.includes("imageUrl")) {
      setProducts((prevProducts: any) => ({
        ...prevProducts,
        imageUrl: {
          ...prevProducts.imageUrl,
          [name]: value,
        },
      }));
    }
    if (checked && type === "checkbox") {
      setSelectedValues((prevValues: any) => [...prevValues, name]);
    } else {
      setSelectedValues((prevValues: any) =>
        prevValues.filter((value: any) => value !== name)
      );
    }
    setProducts((prevProducts: any) => ({
      ...prevProducts,
      colorAvailable: selectedValues,
    }));

    switch (name) {
      case "category":
        setSelectedCategory(value);
        setSelectedSubcategory("");
        setSelectedType("");
        setSelectedSize([]);
        setProducts((prevProduct: any) => ({
          ...prevProduct,
          allCategory: {
            category: value,
            subcategory: "",
            type: "",
            sizes: [],
          },
        }));
        break;

      case "subcategory":
        setSelectedSubcategory(value);
        setSelectedType("");
        setSelectedSize([]);
        setProducts((prevProduct: any) => ({
          ...prevProduct,
          allCategory: {
            ...prevProduct.allCategory,
            subcategory: value,
            type: "",
            sizes: [],
          },
        }));
        break;

      case "type":
        setSelectedType(value);
        setSelectedSize([]);
        setProducts((prevProduct: any) => ({
          ...prevProduct,
          allCategory: {
            ...prevProduct.allCategory,
            type: value,
            sizes: [],
          },
        }));
        break;

      case "size":
        setSelectedSize(value);
        setProducts((prevProduct: any) => ({
          ...prevProduct,
          allCategory: {
            ...prevProduct.allCategory,
            sizes: value,
          },
        }));
        break;
      case "checkStock":
        setValue(value);
        setProducts((prevProducts: any) => ({
          ...prevProducts,
          checkStock: value,
        }));
        break;

      default:
        if (!checked && !name.includes("imageUrl") && type !== "checkbox") {
          setProducts((prevProducts: any) => ({
            ...prevProducts,
            [name]: value,
          }));
        }

        break;
    }
  };
  
  return {
    products,
    addProduct,
    loading,
    selectedCategory,
    selectedSubcategory,
    selectedSize,
    selectedType,
    selectedValues,
    value,
    handleChange
  };
};

export default useAddProductHook;
