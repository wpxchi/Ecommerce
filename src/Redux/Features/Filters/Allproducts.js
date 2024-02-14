import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllClothes = createAsyncThunk(
    'fetchAllClothes',
    async (pagination) => {
      const { limit, offSet } = pagination;
    
      
     
      
      //
      const request = new Request(`https://api.escuelajs.co/api/v1/products?offset=${offSet}&limit=${limit}`)
  
      try {
        const response = await fetch(request);
  
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error('Solicitud fallida');
        }
      } catch (error) {
        throw error;
      }
    }
  );

  const allclothesSlice = createSlice({
    name: 'allclothes',
    initialState: {
      data: [],
      loading: 'idle',
      error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchAllClothes.pending, (state) => {
          state.loading = 'loading';
          state.error = null;
        })
        .addCase(fetchAllClothes.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.data = action.payload;
          state.error = null;
        })
        .addCase(fetchAllClothes.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = 'No Clothes';
        });
    },
  });
  
  export default allclothesSlice.reducer;