import React, { useContext, useState } from "react";
import Input from "./Input";
import FormAction from "./FormAction";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase/firebase.config";
import FormExtra from "./FormExtra";
import { loginFields } from "../../const/Const";
import myContext from "../../context/myContext";
import { toast } from "react-toastify";

export type LoginState = {
  [key: string]: string;
};
const Login = () => {
  const context = useContext(myContext);
  const { setUser, setLoading } = context;

  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const isFormValid = Object.values(loginState).every(
    (value) => value && value.trim() !== ""
  );
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    accountLogin();
  };
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
      toast.success("Signin Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
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
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        {loginFields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id] || ""}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormExtra />
      {error && <p className="text-red-500 text-sm font-normal">{error}</p>}
      <FormAction
        handleSubmit={handleSubmit}
        text="Login"
        disabled={!isFormValid}
      />
    </form>
  );
};

export default Login;
