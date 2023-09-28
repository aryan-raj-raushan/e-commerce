import { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { firebaseDb } from "../firebase/firebase.config";

const MyState = (props: any) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  /* -------------------------------------------------------------------------- */
  /*                                  Dark Mode                                 */
  /* -------------------------------------------------------------------------- */

  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [products, setProducts] = useState<any>({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  /* -------------------------------------------------------------------------- */
  /*                               Add Product Section                          */
  /* -------------------------------------------------------------------------- */
  const addProduct = async () => {
    if (Object.values(products).some((value) => value === null)) {
      return toast.error("Please fill all fields");
    }
    const productRef = collection(firebaseDb, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      toast.success("Product Add successfully", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      getProductData();
      // closeModal()
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    setProducts("");
  };

  const [product, setProduct] = useState([]);

  /* -------------------------------------------------------------------------- */
  /*                                 get product                                */
  /* -------------------------------------------------------------------------- */

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(firebaseDb, "products"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray: any = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                  useEffect                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        setUser,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
