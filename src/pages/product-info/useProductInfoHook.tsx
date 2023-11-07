import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import myContext from "../../context/myContext";
import { firebaseDb } from "../../firebase/firebase.config";
import { getCommonStyles } from "../../HOC/hoc/HOC";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const useProductInfoHook = () => {
  const socialMedia = [
    { icon: <FaFacebookF />, link: "/facebook.com" },
    { icon: <FaTwitter />, link: "/twitter.com" },
    { icon: <FaInstagram />, link: "/instagram.com" },
  ];
  const context = useContext(myContext);
  const { loading, setLoading, mode } = context;
  const darkText = getCommonStyles(mode);

  const [products, setProducts] = useState<any>("");
  const params = useParams();
  const { id } = params;

  const getProductData = async () => {
    setLoading(true);
    try {
      if (id) {
        const productTemp: any = await getDoc(doc(firebaseDb, "products", id));
        setProducts(productTemp.data());
        setLoading(false);
      } else {
        console.error("id is undefined");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart);
  const addCart = (products: any) => {
    dispatch(addToCart(products));
    toast.success("add to cart");
  };
//   const [displayedLines, setDisplayedLines] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  /* -------------------------------------------------------------------------- */
  /*                                   effects                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return {
    loading,
    products,
    darkText,
    socialMedia,
    isExpanded,
    toggleExpand,
    addCart,
  };
};

export default useProductInfoHook;
