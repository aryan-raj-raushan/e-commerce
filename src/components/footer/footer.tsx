import { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../context/myContext";
import { getCommonStyles } from "../../HOC/hoc/HOC";
import HalfFooter from "./halfFooter";


const Footer = ({ showHalf,showFull,className }: any) => {
  const context = useContext(myContext);
  const { mode } = context;
  const darkText = getCommonStyles(mode);
  const darkBg = getCommonStyles(mode, { backgroundColor: "rgb(46 49 55)" });
  return (
    <footer className="text-gray-600 body-font bg-gray-300 " style={darkBg}>
        {showFull && (<div className="container px-5 py-6 mx-auto">
        <div className="flex flex-wrap md:text-left text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2
              className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
              style={darkText}
            >
              CATEGORIES
            </h2>
            <nav className="list-none mb-10">
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-800"
                  style={darkText}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-800"
                  style={darkText}
                >
                  Order
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-800"
                  style={darkText}
                >
                  Local For Vocal
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-600 hover:text-gray-800"
                  style={darkText}
                >
                  Cart
                </a>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2
              className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3 uppercase"
              style={darkText}
            >
              Customer Service
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  to={"/returnpolicy"}
                  className="text-gray-600 hover:text-gray-800"
                  style={darkText}
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="text-gray-600 hover:text-gray-800"
                  style={darkText}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="text-gray-600 hover:text-gray-800"
                  style={darkText}
                >
                  Contact Us
                </Link>
              </li>
            </nav>
          </div>

          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2
              className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3"
              style={darkText}
            >
              Services
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link
                  to={"/privacypolicy"}
                  className="text-gray-600 hover:text-gray-800"
                  style={darkText}
                >
                  Privacy
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <img src="https://ecommerce-sk.vercel.app/pay.png" alt="" />
          </div>
        </div>
      </div>)}
      
      {showHalf && <HalfFooter mode={mode} className={className} />}
    </footer>
  );
};
export default Footer;
