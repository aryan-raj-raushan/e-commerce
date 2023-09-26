import React from "react";

const FormAction = ({
  handleSubmit,
  type = "Button",
  action = "submit",
  text,
  disabled = false,
}: any) => {
  return (
    <>
      {type === "Button" ? (
        <>
          <button
            type={action}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-6 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleSubmit}
            disabled={disabled}
          >
            {text}
          </button>
          {/* {disabled && message && (
            <p className="text-red-500 mt-2">{message}</p>
          )} */}
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default FormAction;
