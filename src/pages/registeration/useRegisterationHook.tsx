import { useContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firebaseDb } from "../../firebase/firebase.config";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { signupFields } from "../../const/Const";

const useRegisterationHook = () => {
  const fieldsState = Object.fromEntries(
    signupFields.map((field) => [field.id, ""])
  );
  const [signupState, setSignupState] = useState(fieldsState);
  const [error, setError] = useState<string | null>(null);
  const isFormValid = Object.values(signupState).every(
    (value) => value.trim() !== ""
  );
  const context = useContext(myContext);
  const { loading, setLoading } = context;
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setSignupState({ ...signupState, [id]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createAccount();
  };

  // Handle Signup API Integration here
  const createAccount = async () => {
    setLoading(true);
    const { email, password, name } = signupState;
    try {
      const users = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now(),
      };
      const userRef = collection(firebaseDb, "users");
      await addDoc(userRef, user);
      toast.success("Signup Succesfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = getCustomErrorMessage(errorCode);
      setLoading(false);
      setError(errorMessage);
      toast.error(errorMessage, {
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
  const getCustomErrorMessage = (errorCode: string) => {
    // Create a mapping of Firebase error codes to custom error messages
    const errorMessages: any = {
      "auth/invalid-email":
        "Invalid email address. Please try with a different email.",
      "auth/email-already-in-use":
        "Email address is already in use. Please use a different email or login",
      // Add more error codes and custom messages as needed
    };

    return (
      errorMessages[errorCode] || "An error occurred. Please try again later."
    ); // Default message
  };
  return {
    error,
    handleSubmit,
    handleChange,
    loading,
    setLoading,
    isFormValid,
    signupFields,
    signupState,
  };
};

export default useRegisterationHook;
