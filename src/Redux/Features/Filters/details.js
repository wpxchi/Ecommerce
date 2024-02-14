import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDetails = createAsyncThunk(
    'fetchDetails',
    async (title) => {
       
    
      //
      const request = new Request(`https://api.escuelajs.co/api/v1/products/?title=${title}&offset=0&limit=1`);
  
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

  const clothesDetails = createSlice({
    name: 'clothesDetails',
    initialState: {
      data: [],
      loading: 'idle',
      error: null 
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchDetails.pending, (state) => {
          state.loading = 'loading';
          state.error = null;
        })
        .addCase(fetchDetails.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.data = action.payload;
          state.error = null;
        })
        .addCase(fetchDetails.rejected, (state, action) => {
          state.loading = 'failed';
          state.error = 'No Clothes Here ';
        });
    },
  });
  
  export default clothesDetails.reducer;