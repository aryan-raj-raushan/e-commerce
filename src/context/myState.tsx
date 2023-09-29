import { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
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

  /* -------------------------------------------------------------------------- */
  /*                               Add Product Section                          */
  /* -------------------------------------------------------------------------- */

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
        setLoading(false);
        window.location.href = "/dashboard";
      }, 1500);
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

  /* -------------------------------------------------------------------------- */
  /*                                 get product                                */
  /* -------------------------------------------------------------------------- */

  const [product, setProduct] = useState([]);
  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(firebaseDb, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray: any = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
      return () => data;
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
  };

  /* -------------------------------------------------------------------------- */
  /*                               Update product                               */
  /* -------------------------------------------------------------------------- */

  const edithandle = (item: any) => {
    setProducts(item);
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(firebaseDb, "products", products.id), products);
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
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error: any) {
      setLoading(false);
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

  const deleteProduct = async (item: any) => {
    try {
      setLoading(true);
      await deleteDoc(doc(firebaseDb, "products", item.id));
      toast.success("Product Deleted successfully", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      getProductData();
    } catch (error) {
      toast.error("Product Deleted Falied");
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
        updateProduct,
        deleteProduct,
        edithandle,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
