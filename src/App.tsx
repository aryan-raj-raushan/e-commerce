import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Order from "./pages/order/Order";
import Home from "./pages/home/Home";
import Dashboard from "./pages/admin/dashboard/dashboard";
import NoPage from "./pages/no-page/NoPage";
import MyState from "./context/myState";
import ProductInfo from "./pages/product-info/ProductInfo";
import Cart from "./pages/cart/Cart";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import SignUpPage from "./pages/registeration/SignUpPage";
import LoginPage from "./pages/registeration/LoginPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ProtectedPaymentGateway,
  ProtectedRoutes,
  ProtectedRoutesForAdmin,
} from "./HOC/routes/protectedRoutes";
import AllProducts from "./pages/all-products/AllProducts";
import Payment from './pages/payment/Payment';

const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/order"
            element={
              <ProtectedRoutes>
                <Order />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutesForAdmin>
                <Dashboard />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route
            path="/addproduct"
            element={
              <ProtectedRoutesForAdmin>
                <AddProduct />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route
            path="/updateproduct"
            element={
              <ProtectedRoutesForAdmin>
                <UpdateProduct />
              </ProtectedRoutesForAdmin>
            }
          />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route
            path="/payment"
            element={
              <ProtectedPaymentGateway>
               <Payment />
              </ProtectedPaymentGateway>
            }
          />

          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
      </Router>
    </MyState>
  );
};

export default App;
