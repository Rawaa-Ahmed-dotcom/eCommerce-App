import type{ StylesConfig } from "react-select";

export interface SortOption {
  value: string;
  label: string;
}

export const options: SortOption[] = [
  { value: "-createdAt", label: "Newest Arrivals" },
  { value: "price", label: "Lowest Price" },
  { value: "-price", label: "Highest Price" },
];

export const customStyles: StylesConfig<SortOption, false> = {
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