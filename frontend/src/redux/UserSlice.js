import { createSlice } from "@reduxjs/toolkit";

const userDataFromLocalStorage = localStorage.getItem("userInfo");
const initialUserData = userDataFromLocalStorage
  ? JSON.parse(userDataFromLocalStorage)
  : null;

const userInitialState = {
  user: initialUserData,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    login(state, action) {
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
    logout(state) {
      state.user = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
