import {motion} from "motion/react";
import { components } from "react-select";

export const options = [
  { value: "-createdAt", label: "Newest Arrivals" },
  { value: "price", label: "Lowest Price" },
  { value: "-price", label: "Highest Price" },
];
export const Menu = (props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      
    >
      <components.Menu {...props} />
    </motion.div>
  );
};
export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#416465",
    borderColor: state.isFocused ? "#586062" : "#586062",
    boxShadow: "none",
    borderRadius: "12px",
    padding: "4px",
    cursor: "pointer",

    "&:hover": {
      borderColor: "#586062",
    },
  }),

  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),

  menu: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    borderRadius: "12px",
    overflow: "hidden",
  }),

  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#416465"
      : state.isFocused
        ? "#7b9899"
        : "#F1FBFF",
    color: "#414848",
    cursor: "pointer",

    "&:active": {
      backgroundColor: "#416465",
    },
  }),

  placeholder: (provided) => ({
    ...provided,
    color: "#d1d5db",
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: "white",

    "&:hover": {
      color: "white",
    },
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};
