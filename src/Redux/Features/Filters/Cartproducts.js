import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
};

const productscartSlice = createSlice({
  name: 'productscart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      const productId = action.payload.id;
      const existingCartItem = state.cart.find((item) => item.id === productId);
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.cart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
    },
    decrementCart: (state, action) => {
      const productId = action.payload;
      const existingCartItem = state.cart.find((item) => item.id === productId);
      if (existingCartItem) {
        if (existingCartItem.quantity > 1) {
          existingCartItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter((item) => item.id !== productId);
        }
      }
    },
    deleteItem: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
  },
});

export const { setCart, decrementCart, deleteItem } = productscartSlice.actions;
export default productscartSlice.reducer;