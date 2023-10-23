import Select from "react-select";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "none",
    focus: "none",
    width: 200,
    cursor: "pointer",
    boxShadow: "none",
    "&:focus": {
      border: "none",
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: "none", // Hide the line between label and dropdown arrow
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#007BFF"
      : state.isFocused
      ? "#f0f0f0"
      : "white",
    color: state.isSelected ? "white" : state.isFocused ? "black" : "black",
    fontSize: "14px",
  }),
};

const SortSelect = ({ data, handleSelectChange, selectedSorting }: any) => {
  return (
    <Select
    value={selectedSorting}
    onChange={handleSelectChange}
    options={data}
    styles={customStyles}
    isSearchable={false}
  />
  );
};

export default SortSelect;
