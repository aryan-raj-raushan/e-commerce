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
import { firebaseDb } from "../firebase/firebase.config";
import { showErrorToast, showSuccessToast } from "../HOC/hoc/HOC";

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
      return showErrorToast("Please fill all fields");
    }
    const productRef = collection(firebaseDb, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products);
      showSuccessToast("Product Add successfully");
      getProductData();
      // closeModal()
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      showErrorToast(error.message);
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
      showErrorToast(error.message);
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
      showSuccessToast("Product Add successfully");
      getProductData();
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      setLoading(false);
      showErrorToast(error.message);
    }
    setProducts("");
  };

  /* -------------------------------------------------------------------------- */
  /*                                DeleteProduct                               */
  /* -------------------------------------------------------------------------- */

  const deleteProduct = async (item: any) => {
    try {
      setLoading(true);
      await deleteDoc(doc(firebaseDb, "products", item.id));
      showSuccessToast("Product Deleted successfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      showErrorToast("Product Deleted Falied");
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                 Paymentmode                                */
  /* -------------------------------------------------------------------------- */

  const [paymentMode, setPaymentMode] = useState(false)

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
        user,
        setUser,
        updateProduct,
        deleteProduct,
        edithandle,
        paymentMode,
        setPaymentMode,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
