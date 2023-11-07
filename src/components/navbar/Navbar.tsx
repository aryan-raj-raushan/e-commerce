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
import DropdownMenu from "./DropdownMenu";
import { Fade as Hamburger } from "hamburger-react";

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

  const [showDropdown, setShowDropdown] = useState(false);
  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };
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
          userName={userName}
          darkText={darkText}
        />

        {/* /* -------------------------------- Lower Nav -------------------------------  */}
        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl "
          style={darkBg}
        >
          {/* <div className=""> */}
          <div className="flex h-16 items-center">
            <div
              className="rounded-md lg:hidden flex items-center border-2 border-gray-200 mr-1 h-10 w-auto justify-center"
              onClick={handleMobileMenu}
              style={darkBg}
            >
              <Hamburger
                toggled={open}
                toggle={setOpen}
                size={18}
                direction="right"
                duration={0.8}
                distance="sm"
                color="black"
                rounded
                hideOutline={true}
              />
            </div>

            {/* Logo */}
            <div className="sm:ml-4 flex items-center lg:ml-0">
              <Link to={"/"} className="lg:ml-4">
                <h2 className="text-gray-900 text-xl sm:text-3xl font-extrabold">
                  24<span className="text-purple-500">Seven</span>
                </h2>
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              {user?.user ? (
                <div
                  className=" lg:ml-4 hidden lg:flex relative cursor-pointer"
                  onClick={handleShowDropdown}
                >
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
                  <div className="absolute top-12 right-0">
                    <DropdownMenu
                      showDropdown={showDropdown}
                      handleLogout={handleLogout}
                      user={user}
                      mode={mode}
                    />
                  </div>
                </div>
              ) : (
                <div className="lg:flow-root hidden">
                  <a
                    href="/login"
                    className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                    style={darkText}
                  >
                    Login
                  </a>
                </div>
              )}

              {/* Search */}
              <div className="flex lg:ml-6">
                <button className="" onClick={toggleMode}>
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
              <div className="flow-root sm:pt-1">
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
          {/* </div> */}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
