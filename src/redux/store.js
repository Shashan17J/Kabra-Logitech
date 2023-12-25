import { configureStore } from "@reduxjs/toolkit";
// import { CartReducer } from "./sl";
import { CartSlice } from "./slice/CartSlice";

const reducer = {
  cart: CartSlice.reducer,
};

const store = configureStore({
  reducer,
});

export default store;
