import { createSlice } from "@reduxjs/toolkit";

const productInitialState = {
  productList: {
    loading: true,
    error: false,
    product: {},
  },
};

const singleProductSlice = createSlice({
  name: "single_product",
  initialState: productInitialState,
  reducers: {
    singleProduct(state, action) {
      state.productList.product = action.payload;
      state.productList.loading = false;
    },
    error(state, action) {
      state.productList.error = action.payload;
      state.productList.loading = false;
    },
  },
});

export const singleProductActions = singleProductSlice.actions;

export default singleProductSlice;
