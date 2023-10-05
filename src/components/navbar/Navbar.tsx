import React, { useContext, useEffect, useState } from "react";
import myContext from "../../context/myContext";
import { Link, useNavigate } from "react-router-dom";
import { BsFillCloudSunFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import MobileMenu from "./MobileMenu";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../firebase/firebase.config";
import { useSelector } from "react-redux";
import { getCommonStyles } from "../../HOC/hoc/HOC";
import { CartItem } from "../../MaterialUI/Icon";
import { BackgroundLetterAvatars } from "../../MaterialUI/Avatar";
import DefaultUser from "../../assets/images/user.png";

const Navbar = () => {
  const context = useContext(myContext);
  const { toggleMode, mode } = context;
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user?.user?.displayName;
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

  const handleMobileMenu = () => {
    setOpen(!open);
  };
  const darkText = getCommonStyles(mode);
  const darkBg = getCommonStyles(mode, { backgroundColor: "rgb(80 82 87)" });

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (user?.user) {
      setLoggedIn(true);
    }
  }, [user]);

  const menuItems = loggedIn
    ? [
        { label: "Find a Store", link: "/store" },
        { label: "Help", link: "/help" },
        { label: `Welcome, ${user?.user?.displayName}`, link: "/" },
      ]
    : [
        { label: "Find a Store", link: "/store" },
        { label: "Help", link: "/help" },
        { label: "Join Us", link: "/signup" },
        { label: "Sign In", link: "/login" },
      ];

  return (
    <div className="bg-white sticky top-0 z-40">
      {/* Desktop menu */}
      <header className="relative bg-white">
        {/* -------------------------------- Upper nav ------------------------------- */}
        <div className="hidden lg:flex h-10 items-center justify-end bg-black px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 cursor-pointer">
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                <a href={item.link}>{item.label}</a>
                {index !== menuItems.length - 1 && <span>|</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile menu */}

        <MobileMenu
          open={open}
          mode={mode}
          setOpen={handleMobileMenu}
          logout={handleLogout}
          user={user}
        />

        {/* /* -------------------------------- Lower Nav -------------------------------  */}
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
                onClick={handleMobileMenu}
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

                {user?.user && (
                  <div className="hidden lg:ml-4 lg:flex">
                    {user?.user?.displayName ? (
                      <BackgroundLetterAvatars userName={userName} />
                    ) : (
                      <img
                        className="inline-block w-8 h-8 rounded-full lg:ml-8"
                        src={
                          user?.user?.displayName ? DefaultUser : "Dan_Abromov"
                        }
                        alt="Dan_Abromov"
                      />
                    )}
                  </div>
                )}

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
                <div className="flow-root pt-1">
                  <Link
                    to={"/cart"}
                    className="group flex items-center p-2"
                    style={darkText}
                  >
                    <CartItem cartItem={cartItems.length} mode={mode} />
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
