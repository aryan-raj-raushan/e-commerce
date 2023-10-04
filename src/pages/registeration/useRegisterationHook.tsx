import { useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth, firebaseDb } from "../../firebase/firebase.config";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { signupFields } from "../../const/Const";
import { showErrorToast, showSuccessToast } from "../../HOC/hoc/HOC";

export type LoginState = {
  [key: string]: string;
};

const useRegisterationHook = () => {
  const context = useContext(myContext);
  const { loading, setLoading, setUser } = context;
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /*                                  common in both                            */
  /* -------------------------------------------------------------------------- */

  const [error, setError] = useState<string | null>(null);

  const getCustomErrorMessage = (errorCode: string) => {
    // Create a mapping of Firebase error codes to custom error messages
    const errorMessages: any = {
      "auth/invalid-email":
        "Invalid email address. Please try with a different email.",
      "auth/email-already-in-use":
        "Email address is already in use. Please use a different email or login",
      "auth/wrong-password":
        "Wrong password. Please enter the correct password.",
      "auth/email-not-found":
        "Email not found. The provided email address is not registered.",
      // Add more error codes and custom messages as needed
    };

    return (
      errorMessages[errorCode] || "An error occurred. Please try again later."
    ); // Default message
  };

  /* -------------------------------------------------------------------------- */
  /*                                   signup                                   */
  /* -------------------------------------------------------------------------- */

  const fieldsState = Object.fromEntries(
    signupFields.map((field) => [field.id, ""])
  );
  const [signupState, setSignupState] = useState(fieldsState);
  const isSignUpValid = Object.values(signupState).every(
    (value) => value.trim() !== ""
  );

  const handleSignUp = (e: any) => {
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
      showSuccessToast("Signup Succesfully");
      setLoading(false);
      navigate("/login");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = getCustomErrorMessage(errorCode);
      setLoading(false);
      setError(errorMessage);
      showErrorToast(errorMessage);
    }
  };

  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
  });
  const isLoginValid = Object.values(loginState).every(
    (value) => value && value.trim() !== ""
  );

  const handleLogin = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };
  const handleSubmitLogin = async (e: any) => {
    e.preventDefault();
    accountLogin();
  };

  /* -------------------------------------------------------------------------- */
  /*                                    Login                                   */
  /* -------------------------------------------------------------------------- */

  const accountLogin = async () => {
    const { email, password } = loginState;
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      localStorage.setItem("user", JSON.stringify(userCredential));
      const user = userCredential.user;
      setUser(user);
      showSuccessToast("Signin Successfully");
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = getCustomErrorMessage(errorCode);
      setLoading(false);
      setError(errorMessage);
      showErrorToast(errorMessage);
    }
  };

  return {
    error,
    handleSubmit,
    handleSignUp,
    loading,
    setLoading,
    isSignUpValid,
    signupFields,
    signupState,
    accountLogin,
    handleLogin,
    handleSubmitLogin,
    isLoginValid,
    loginState
  };
};

export default useRegisterationHook;
