import { createSlice } from "@reduxjs/toolkit";

const cartItemFromLocalStorage = localStorage.getItem("cartItems");
const initialCartItems = cartItemFromLocalStorage
  ? JSON.parse(cartItemFromLocalStorage)
  : [];

const cartInitialState = {
  cartItem: initialCartItems,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addCardItem(state, action) {
      const item = action.payload;
      const existItems = state.cartItem.find((x) => x.product === item.product);
      if (existItems) {
        state.cartItem = state.cartItem.map((x) => {
          return x.product === existItems.product ? item : x;
        });
      } else {
        state.cartItem = [...state.cartItem, action.payload];
      }
    },
    removeCardItem(state, action) {
      const id = action.payload;
      state.cartItem = state.cartItem.filter((x) => x.product !== id);
    },
    updateCartItemQty(state, action) {
      const { id, updateQty } = action.payload;
      const cartItemIndex = state.cartItem.findIndex(
        (item) => item.product === id
      );

      if (cartItemIndex !== -1) {
        state.cartItem[cartItemIndex] = {
          ...state.cartItem[cartItemIndex],
          qty: updateQty,
        };
      }
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice;
