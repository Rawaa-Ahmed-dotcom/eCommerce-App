import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice.ts";

export const store = configureStore({reducer : {productFilters : productReducer}});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch