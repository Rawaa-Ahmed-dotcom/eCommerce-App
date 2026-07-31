import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice.ts";
import cartReducer from "./features/cartSlice.ts";
import authReducer from "./features/userSlice.ts";
import orderReducer from "./features/orderSlice.ts";
export const store = configureStore({
  reducer: {
    productFilters: productReducer,
    cartState: cartReducer,
    authState: authReducer,
    ordersFilter: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
