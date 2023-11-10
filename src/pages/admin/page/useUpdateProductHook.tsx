import { useContext, useEffect } from "react";
import myContext from "../../../context/myContext";

const useUpdateProductHook = () => {
  const context = useContext(myContext);
  const {
    products,
    setProducts,
    loading,
    selectedCategory,
    selectedSubcategory,
    selectedType,
    selectedValues,
    value,
    setSelectedCategory,
    setSelectedSubcategory,
    setSelectedSize,
    setSelectedType,
    setSelectedValues,
    setValue,
    updateProduct,
    handleBack,
  } = context;

  const { allCategory, colorAvailable,checkStock } = products ?? {};
  const { subcategory, type, size, category } = allCategory ?? {};

  const color = colorAvailable && colorAvailable;

  useEffect(() => {
    setSelectedValues(color || []);
  }, [color, setSelectedValues]);

  const handleChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    let updatedColorAvailable = [...(color || [])];
    if (name.includes("imageUrl")) {
      if (value.trim() === "") {
        setProducts((prevProducts: any) => {
          const updatedImageUrl = { ...prevProducts.imageUrl };
          delete updatedImageUrl[name];
          return { ...prevProducts, imageUrl: updatedImageUrl };
        });
      } else {
        // Update the state only if the value is not empty
        setProducts((prevProducts: any) => ({
          ...prevProducts,
          imageUrl: {
            ...prevProducts.imageUrl,
            [name]: value,
          },
        }));
      }
    }
    if (checked && type === "checkbox") {
      if (!updatedColorAvailable.includes(name)) {
        updatedColorAvailable.push(name);
      }
    } else {
      updatedColorAvailable = updatedColorAvailable.filter(
        (color: string) => color !== name
      );
    }
    setSelectedValues(updatedColorAvailable);
    setProducts((prevProducts: any) => ({
      ...prevProducts,
      colorAvailable: updatedColorAvailable,
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
    loading,
    products,
    selectedCategory,
    selectedSubcategory,
    selectedType,
    selectedValues,
    value,
    updateProduct,
    handleBack,
    handleChange,
    subcategory,
    type,
    size,
    category,
    checkStock
  };
};

export default useUpdateProductHook;
