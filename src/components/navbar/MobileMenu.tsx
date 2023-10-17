import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { BackgroundLetterAvatars } from "../../MaterialUI/Avatar";
import DefaultUser from "../../assets/images/user.png";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUserLock } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { FiLogOut, FiUser } from "react-icons/fi";

const MobileMenu = ({
  open,
  setOpen,
  mode,
  user,
  logout,
  userName,
  darkText,
}: any) => {
  const menuItems = [
    user?.user && { label: "My Profile", href: "/", icon: <FiUser /> },
    {
      label: "Order",
      href: "/order",
      icon: <AiOutlineShopping />,
    },
    user?.user?.email.includes("aryan") && {
      label: "Admin",
      href: "/dashboard",
      icon: <FaUserLock />,
    },
    {
      label: "Contact Us",
      href: "/",
      icon: <RiCustomerService2Line />,
    },
    user?.user
      ? {
          label: "Logout",
          onClick: logout,
          icon: <FiLogOut />,
        }
      : { label: "Login", href: "/login", icon: <FiUser /> },
  ].filter(Boolean);
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative  z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-x-0 top-16 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-x-0 top-16 shadow-lg bottom-0 flex z-40">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gray-50 pt-2 pb-12 shadow-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="space-y-4 border-b border-gray-200 px-5 py-6 text-sm font-normal text-black">
                  {menuItems.map((item: any, index: number) => (
                    <div className="flow-root" key={index}>
                      {item.href ? (
                        <Link to={item.href} className="block" style={darkText}>
                          <div className="flex items-center">
                            {item.icon && (
                              <div className="mr-2">{item.icon}</div>
                            )}
                            {item.label}
                          </div>
                        </Link>
                      ) : (
                        <>
                          {user?.user ? (
                            <button
                              onClick={item.onClick}
                              className="block cursor-pointer"
                              style={darkText}
                            >
                              <div className="flex items-center">
                                {item.icon && (
                                  <div className="mr-2">{item.icon}</div>
                                )}
                                {item.label}
                              </div>
                            </button>
                          ) : null}
                        </>
                      )}
                    </div>
                  ))}
                  <div className="">
                    {user?.user && (
                      <div className="text-sm font-normal text-black">
                        {user?.user?.displayName ? (
                          <BackgroundLetterAvatars userName={userName} />
                        ) : (
                          <img
                            className="inline-block w-8 h-8 rounded-full lg:ml-8"
                            src={
                              user?.user?.displayName
                                ? DefaultUser
                                : "Dan_Abromov"
                            }
                            alt="Dan_Abromov"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default MobileMenu