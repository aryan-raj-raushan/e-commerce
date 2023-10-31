import { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSize, setSelectedSize] = useState([]);
  const [value, setValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<any>([]);

  const initialProductsState = {
    brandName: null,
    title: null,
    price: null,
    imageUrl: null,
    allCategory: null,
    description: null,
    checkStock: null,
    storeLocation: null,
    storeName: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };

  const [products, setProducts] = useState<any>(initialProductsState);

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedType("");
    setSelectedSize([]);
    setValue("");
    setSelectedValues([]);
    setProducts(initialProductsState);
  };

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
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      showErrorToast(error.message);
    }
    resetForm();
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
  const handleBack = () => {
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 800);
    setLoading(true)
    setProducts(initialProductsState);
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(firebaseDb, "products", products.id), products);
      showSuccessToast("Product updated successfully");
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
    resetForm()
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
  /*                                 PaymentMode                                */
  /* -------------------------------------------------------------------------- */

  const [paymentMode, setPaymentMode] = useState();

  /* -------------------------------------------------------------------------- */
  /*                                 Order data                                */
  /* -------------------------------------------------------------------------- */

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(firebaseDb, "orders"));
      const ordersArray: any = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                    user                                    */
  /* -------------------------------------------------------------------------- */

  const [userData, setUserData] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(firebaseDb, "users"));
      const usersArray: any = [];

      result.forEach((doc) => {
        const userData = doc.data();
        // Check if the timestamp field exists and is a timestamp
        if (userData.time && userData.time instanceof Timestamp) {
          userData.time = userData.time.toDate();
        }
        usersArray.push(userData);
      });

      setUserData(usersArray);
      setLoading(false);
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
    getOrderData();
    getUserData();
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
        order,
        userData,
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
        handleBack
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
