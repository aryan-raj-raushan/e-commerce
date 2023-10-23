import { Dialog, Transition } from "@headlessui/react";
import { Checkbox } from "@mui/material";
import React, { Fragment, useState } from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const FilterMenu = ({ mode, open, setOpen,selectedCategory,setSelectedCategory,handleFilterClose }: any) => {
  const filterCategories = [
    { title: "Size", value:"size", options: ["Small", "Medium", "Large", "XL", "XXL"] },
    {
      title: "Offers", value:"offers",
      options: [
        "Limited Time Special",
        "Lowest Price Ever",
        "Sales",
        "Discount",
      ],
    },
    { title: "Gender",value:"gender", options: ["Men", "Women", "Boy", "Girl", "Kids"] },
  ];

  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  const toggleCategory = (category: any) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleCheckboxChange = (option: any) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((item: any) => item !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={handleFilterClose}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 shadow-lg bottom-0 flex z-40">
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
                className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-gray-50 pt-4 pb-12 shadow-xl"
                style={{
                  backgroundColor: mode === "dark" ? "rgb(40, 44, 52)" : "",
                  color: mode === "dark" ? "white" : "",
                }}
              >
                <div className="flex items-center justify-between border-b border-gray-400 pb-4 px-4">
                  <h2 className="text-xl text-black font-semibold">Filters</h2>
                  <RxCross2
                    size={22}
                    className="cursor-pointer"
                    // onClick={() => setOpen(false)}
                    onClick={handleFilterClose}
                  />
                </div>
                <div className="flex flex-col space-y-2 px-4 ">
                  {filterCategories.map((category) => (
                    <div className="" key={category.title}>
                      <div
                        className="filter-category border-b border-gray-300 py-3 flex items-center justify-between"
                        onClick={() => toggleCategory(category.value)}
                      >
                        <h3 className="text-black text-lg font-medium">
                          {category.title}
                        </h3>
                        {selectedCategory === category.value ? (
                          <BiMinus />
                        ) : (
                          <BsPlusLg />
                        )}
                      </div>
                      {selectedCategory === category.value && (
                        <ul className="filter-options px-4 flex flex-col gap-1 py-2">
                          {category.options.map((option) => (
                            <li key={option}>
                              <Checkbox
                                color="primary"
                                checked={selectedOptions.includes(option)}
                                onChange={() => {
                                  handleCheckboxChange(option);
                                }}
                              />
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default FilterMenu;
