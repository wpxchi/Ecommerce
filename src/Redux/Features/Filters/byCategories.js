import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchbyCat = createAsyncThunk(
    'fetchbyCat',
    async (buttons) => {
      const { limit, offSet, categories } = buttons;

      //
      const request = new Request(`https://api.escuelajs.co/api/v1/products/?categoryId=${categories}&offset=${offSet}&limit=${limit}`)
  
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

  const byCatSlice = createSlice({
    name: 'byCat',
    initialState: {
      data: [],
      loading: 'idle',
      error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchbyCat.pending, (state) => {
          state.loading = 'loading';
          state.error = null;
        })
        .addCase(fetchbyCat.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.data = action.payload;
          state.error = null;
        })
        .addCase(fetchbyCat.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = 'No Clothes';
        });
    },
  });
  
  export default byCatSlice.reducer;