import { toast } from "react-toastify";
import { months } from "../../const/Const";

export const CommonInputProps = ({ field, handleChange, products }: any) => {
  return {
    name: field.name,
    onChange: handleChange,
    value: products[field.name] || "",
    className:
      "bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none",
    placeholder: field.placeholder,
  };
};

export const getCommonStyles = (
  mode: "dark" | "light",
  styleOptions: { backgroundColor?: string } = {}
) => ({
  backgroundColor: mode === "dark" ? styleOptions.backgroundColor : "",
  color: mode === "dark" ? "white" : "",
});

export const showSuccessToast = (message: any) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 1200,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    // theme: "colored",
  });
};

export const showErrorToast = (message: any) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    // theme: "colored",
  });
};

export const formatDate = (date: any) => {
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};