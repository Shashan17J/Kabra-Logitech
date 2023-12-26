import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      return state.filter((item) => item.name !== action.payload);
    },
    increment: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.find((item) => item.name === itemId);

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrement: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.find((item) => item.name === itemId);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
  },
});

export const { add, remove, increment, decrement } = CartSlice.actions;
export default CartSlice.reducer;

export const selectTotalProducts = (state) => {
  return state.cart.length;
};
