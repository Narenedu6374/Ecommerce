import { createSlice } from "@reduxjs/toolkit";

const userRegisterInitialState = {
  user: null,
  loading: false,
  error: false,
};

const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: userRegisterInitialState,
  reducers: {
    register(state, action) {
      state.user = action.payload;
      state.loading = false;
    },
    error(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    loading(state) {
      state.loading = true;
    },
  },
});

export const userRegisterActions = userRegisterSlice.actions;

export default userRegisterSlice;
