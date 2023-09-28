import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }: any) => {
    if (localStorage.getItem("user")) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };
  
  export const ProtectedRoutesForAdmin = ({ children }: any) => {
    const admin = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(admin.user.email)
    if (admin.user.email.includes("gmail")) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  };