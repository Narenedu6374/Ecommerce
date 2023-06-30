import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ProductSlice";
import singleProductSlice from "./SingleProductSlice";
import cartSlice from "./CartSlice";
import userSlice from "./UserSlice";
import userRegisterSlice from "./UserRegisterSlice";
import userDetailsSlice from "./userDetailsSlice";
import userUpdateSlice from "./userUpdateSlice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    singleProduct: singleProductSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdate: userUpdateSlice.reducer,
  },
});

export default store;
