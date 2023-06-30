import { createSlice } from "@reduxjs/toolkit";

const userDetailsInitialState = {
  userDetails: null,
  loading: false,
  error: false,
};

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: userDetailsInitialState,
  reducers: {
    getDetails(state, action) {
      state.userDetails = action.payload;
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

export const userDetailsActions = userDetailsSlice.actions;

export default userDetailsSlice;
