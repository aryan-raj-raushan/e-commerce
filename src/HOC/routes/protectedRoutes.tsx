import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import myContext from "../../context/myContext";

export const ProtectedRoutes = ({ children }: any) => {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export const ProtectedPaymentGateway = ({ children }: any) => {
  const context = useContext(myContext);
  const { paymentMode } = context;
  if (
    JSON.parse(localStorage.getItem("cart") || "").length > 0 &&
    paymentMode
  ) {
    return children;
  } else {
    return <Navigate to="/nopage" />;
  }
};

export const ProtectedRoutesForAdmin = ({ children }: any) => {
  const admin = JSON.parse(localStorage.getItem("user") || "{}");
  if (admin.user.email.includes("gmail")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
