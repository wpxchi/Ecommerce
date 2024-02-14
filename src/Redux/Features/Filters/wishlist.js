import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setList: (state, action) => {
      const productId = action.payload.id;
      const isProductInWishlist = state.list.some((item) => item.id === productId);

      if (!isProductInWishlist) {
        state.list = [...state.list, { ...action.payload, quantity: 1 }];
      }
    },

    deleteItemList: (state, action) => {
      const productId = action.payload;
      state.list = state.list.filter((item) => item.id !== productId);
    },
  },
});

export const { setList, deleteItemList } = wishlistSlice.actions;
export default wishlistSlice.reducer;