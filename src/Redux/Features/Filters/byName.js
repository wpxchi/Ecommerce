import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchByNameClothes = createAsyncThunk(
    'fetchByNameClothes',
    async (pagination) => {
        const {name, offSet, limit}= pagination
    
      //
      const request = new Request(`https://api.escuelajs.co/api/v1/products/?title=${name}&offset=${offSet}&limit=${limit}`);
  
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

  const clothesNameSlice = createSlice({
    name: 'clothesName',
    initialState: {
      data: [],
      loading: 'idle',
      error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchByNameClothes.pending, (state) => {
          state.loading = 'loading';
          state.error = null;
        })
        .addCase(fetchByNameClothes.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.data = action.payload;
          state.error = null;
        })
        .addCase(fetchByNameClothes.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = 'No Clothes Here ';
        });
    },
  });
  
  export default clothesNameSlice.reducer;