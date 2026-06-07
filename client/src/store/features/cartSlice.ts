import { createSlice } from "@reduxjs/toolkit";
import type { cartItem, cartState } from "../../utils/Types";

const cartItems = JSON.parse(localStorage.getItem("cartItems") as string) || [];
console.log(cartItems);
const initialState: cartState = {
  cartItems,
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "CartState",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existed = state.cartItems.find(
        (item: cartItem) =>
          item.slug === action.payload.slug &&
          item.color === action.payload.color &&
          item.size === action.payload.size,
      );
      if (!existed) {
        state.cartItems.push(action.payload);
      } else {
        existed.quantity += action.payload.quantity;
      }
      state.totalQuantity += action.payload.quantity;
      state.totalAmount += action.payload.quantity * action.payload.price;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { slug, type, color , size } = action.payload;
      const target = state.cartItems.find((item) => item.color === color && item.size === size && item.slug === slug);
      if (target) {
        if (type === "increment") {
          target.quantity += 1;
        }
        if (type === "decrement") {
          if (target?.quantity === 1) target.quantity = 1;
          else target.quantity -= 1;
        }
        localStorage.setItem("cartItems" , JSON.stringify(state.cartItems));
      }
    },
    deleteItem: (state, action) => {
      const { slug , color , size} = action.payload;

      const target = state.cartItems.find(
        (item: cartItem) => item.slug === slug && item.color === color && item.size === size,
      );
      if (target) {
        state.cartItems = state.cartItems.filter(
          (item: cartItem) => item !== target
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, updateQuantity, deleteItem } = cartSlice.actions;
