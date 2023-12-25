// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       const { label, quantity: specifiedQuantity } = action.payload;
//       const itemExists = state.find((item) => item.label === label);

//       if (itemExists) {
//         return state.map((item) =>
//           item.label === label ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         const newState = [
//           ...state,
//           { ...action.payload, quantity: specifiedQuantity || 1 },
//         ];
//         localStorage.setItem("cart", JSON.stringify(newState));
//         return newState;
//       }
//     },
//     removeFromCart: (state, action) => {
//       const index = state.findIndex(
//         (item) => item.label === action.payload.label
//       );
//       state.splice(index, 1);
//       localStorage.setItem("cart", JSON.stringify(state));
//     },
//     clearCart: (state) => {
//       // Clear the cart in the state
//       state.splice(0, state.length);
//       localStorage.removeItem("cart"); // Clear the cart in local storage
//     },

//     incrementQuantity: (state, action) => {
//       const item = state.find((item) => item.name === action.payload.name);
//       item.quantity++;
//       localStorage.setItem("cart", JSON.stringify(state));
//     },
//     decrementQuantity: (state, action) => {
//       const item = state.find((item) => item.name === action.payload.name);
//       if (item.quantity === 1) {
//         const index = state.findIndex((item) => item.id === action.payload.id);
//         state.splice(index, 1);
//       } else {
//         item.quantity--;
//         localStorage.setItem("cart", JSON.stringify(state));
//       }
//     },
//     setCartList: (state, action) => {
//       // Use the payload to set the cart list in the state
//       return action.payload;
//     },
//   },
// });
// export const CartReducer = cartSlice.reducer;
// export const getCartfromStorage = () => (dispatch) => {
//   try {
//     // Retrieve cart data from local storage
//     const storedCartList = localStorage.getItem("cart");
//     console.log(storedCartList);

//     // Parse the stored string into a JavaScript object
//     const parsedCartList = JSON.parse(storedCartList);
//     console.log(parsedCartList);

//     // If data is found in local storage, dispatch the setCartList action to update the state
//     if (parsedCartList) {
//       dispatch(setCartList(parsedCartList));
//     }
//   } catch (error) {
//     // Handle errors, e.g., log the error or dispatch an action to handle it
//     console.error("Error fetching cart data from local storage:", error);
//     // You might dispatch an error action here if needed
//   }
// };

// export const {
//   getCartfromStorage,
//   setCartList,
//   addToCart,
//   incrementQuantity,
//   decrementQuantity,
//   removeFromCart,
//   clearCart,
// } = cartSlice.actions;
// export default cartSlice;

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
