import { createSlice } from "@reduxjs/toolkit";

const userUpdateInitialState = {
  user: null,
  updateloading: false,
  error: false,
};

const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: userUpdateInitialState,
  reducers: {
    updateDetails(state, action) {
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

export const userUpdateActions = userUpdateSlice.actions;

export default userUpdateSlice;
