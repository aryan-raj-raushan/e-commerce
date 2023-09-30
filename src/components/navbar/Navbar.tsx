import React, { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import { BsCart3, BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase.config";
import { useSelector } from "react-redux";
import { getCommonStyles } from "../../HOC/hoc/HOC";

const Navbar = () => {
  const context = useContext(myContext);
  const { toggleMode, mode } = context;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const cartItems = useSelector((state: any) => state.cart);
  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const darkText = getCommonStyles(mode);
  const darkBg = getCommonStyles(mode, { backgroundColor: "rgb(80 82 87)" });

  const menuItems = [
    { label: "Find a Store", link: "/store" },
    { label: "Help", link: "/help" },
    { label: "Join Us", link: "/signup" },
    { label: "Sign In", link: "/login" },
  ];

  const [loggedIn, setLoggedIn] = useState(false); // You can set this state based on your authentication logic

  const toggleLogin = () => {
    // Implement your login/logout logic here and update the loggedIn state accordingly
    setLoggedIn(!loggedIn);
  };

  return (
    <div className="bg-white sticky top-0 z-50  ">
      {/* Mobile menu */}

      <MobileMenu
        open={open}
        mode={mode}
        setOpen={setOpen}
        logout={handleLogout}
        user={user}
      />

      {/* Desktop menu */}
      <header className="relative bg-white">
        {/* /* -------------------------------- Upper nav -------------------------------  */}
        <div className="flex h-10 items-center justify-end bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 cursor-pointer">
            {menuItems.map((item, index) => {
              // Conditionally change "Join Us" and "Sign In" to "Log Out" when the user is logged in
              if (
                (item.label === "Join Us" || item.label === "Sign In") &&
                loggedIn
              ) {
                return (
                  <React.Fragment key={index}>
                    <a href="/" onClick={toggleLogin}>
                      Log Out
                    </a>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={index}>
                    <a href={item.link}>{item.label}</a>
                    {index !== menuItems.length - 1 && <span>|</span>}
                  </React.Fragment>
                );
              }
            })}
          </div>
        </div>

        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "
          style={darkBg}
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
                style={darkBg}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"} className="flex">
                  <div className="flex ">
                    <h1
                      className=" text-2xl font-bold text-black  px-2 py-1 rounded"
                      style={darkText}
                    >
                      E-Bharat
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to={"/allproducts"}
                    className="text-sm font-medium text-gray-700 "
                    style={darkText}
                  >
                    All Products
                  </Link>
                  <Link
                    to={"/order"}
                    className="text-sm font-medium text-gray-700 "
                    style={darkText}
                  >
                    Order
                  </Link>
                  {user?.user?.email.includes("aryan") ? (
                    <div className="flow-root">
                      <Link
                        to={"/dashboard"}
                        className="-m-2 block p-2 font-medium text-gray-900"
                        style={darkText}
                      >
                        Admin
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}

                  {user?.user ? (
                    <div className="flow-root">
                      <a
                        href="/login"
                        onClick={handleLogout}
                        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                        style={darkText}
                      >
                        Logout
                      </a>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <a
                        href="/login"
                        className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                        style={darkText}
                      >
                        Login
                      </a>
                    </div>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="/" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span
                      className="ml-3 block text-sm font-medium"
                      style={darkText}
                    >
                      INDIA
                    </span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <a href="/" className="flex items-center text-gray-700 ">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                      alt="Dan_Abromov"
                    />
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <button className="" onClick={toggleMode}>
                    {/* <MdDarkMode size={35} style={{ color: mode === 'dark' ? 'white' : '' }} /> */}
                    {mode === "light" ? (
                      <FiSun className="" size={30} />
                    ) : "dark" ? (
                      <BsFillCloudSunFill size={30} />
                    ) : (
                      ""
                    )}
                  </button>
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link
                    to={"/cart"}
                    className="group -m-2 flex items-center p-2"
                    style={darkText}
                  >
                    <BsCart3 size={20} />

                    <span
                      className="ml-2 text-sm font-medium text-gray-700 group"
                      style={darkText}
                    >
                      {cartItems.length}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
