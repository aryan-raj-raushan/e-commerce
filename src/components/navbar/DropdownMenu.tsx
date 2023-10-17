import { Menu, Transition } from '@headlessui/react';
import { AiOutlineShopping } from "react-icons/ai";
import { FaUserLock } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { FiLogOut, FiUser } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { getCommonStyles } from '../../HOC/hoc/HOC';

const DropdownMenu = ({ showDropdown, handleLogout, user,mode }: any) => {
  const darkBg = getCommonStyles(mode, { 	backgroundColor: "rgb(55 65 81)" });
  const darkText = getCommonStyles(mode);

    const menuItems = [
        { label: "My profile", href: "/",icon: <FiUser/> },
        { label: "Order", href: "/order",icon: <AiOutlineShopping/>},
        user?.user?.email.includes("aryan")
          ? { label: "Admin", href: "/dashboard",icon: <FaUserLock/>}
          : null,
        { label: "Contact us", href: "/",icon:<RiCustomerService2Line/> },
        { label: "Logout", onClick: handleLogout,icon:  <FiLogOut/>},
      ].filter(Boolean);
  return (
        <Transition
          show={showDropdown}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu>
            <div className="origin-top-right absolute mt-2 right-0 w-48 rounded-md shadow-lg ring-1 bg-white ring-black ring-opacity-5 focus:outline-none"
            style={darkBg}>
              <div className="py-1">
                {menuItems.map((item:any, index:number) => (
                  <Menu.Item key={index}>
                    {({ active }) =>
                      item.onClick ? (
                        <button
                          className={`block w-full text-start px-4 py-2 ${
                            active && "bg-blue-500 text-black"
                          }`}
                          onClick={item.onClick}
                          style={darkText}
                        >
                           <div className="flex items-center">
                            {item.icon && (
                              <div className="mr-2">{item.icon}</div>
                            )}
                            {item.label}
                          </div>
                        </button>
                      ) : (
                        <Link
                        className={`block px-4 py-2 ${active && "bg-blue-500 text-black"}`}
                        to={item.href}
                        style={darkText}
                      >
                        <div className="flex items-center">
                          {item.icon && (
                            <div className="mr-2">{item.icon}</div>
                          )}
                          {item.label}
                        </div>
                      </Link>
    
                      )
                    }
                  </Menu.Item>
                ))}
              </div>
            </div>
          </Menu>
        </Transition>
      );
}

export default DropdownMenu