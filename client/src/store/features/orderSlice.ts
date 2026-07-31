import { createSlice } from "@reduxjs/toolkit";
import type { OrdersFilters } from "../../utils/Types";

const initialState: OrdersFilters = {
  status: "",
};

const ordersFilters = createSlice({
  name: "ordersFilters",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    clearFilter: (state) => {
      state.status = "";
    },
  },
});

export default ordersFilters.reducer;
export const { setStatus, clearFilter } = ordersFilters.actions;
