import { createSlice } from "@reduxjs/toolkit";

const productInitialState = {
  productList: {
    loading: true,
    error: false,
    products: [],
  },
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    productRequest(state, action) {
      state.productList.products = action.payload;
      state.productList.loading = false;
    },
    error(state, action) {
      state.productList.error = action.payload;
      state.productList.loading = false;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
