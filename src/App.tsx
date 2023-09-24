import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Order from './pages/order/Order';
import Cart from './pages/cart/cart';
import Home from './pages/home/Home';
import Dashboard from './pages/admin/dashboard/dashboard';
import NoPage from './pages/no-page/NoPage';

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/order" element={<Order/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/*" element={<NoPage/>} />
    </Routes>
  </Router>
  );
}

export default App;
