import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchPastries = createAsyncThunk(
  'pastries/fetchPastries',
  async () => {
    var token = localStorage.getItem('token');  
    

    const response = await fetch('http://localhost:3001/api/pastries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des pâtisseries');
    }

    const data = await response.json();
    return data;
  }
);

export const pastriesSlice = createSlice({
  name: 'pastries',
  initialState: {
    pastries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPastries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastries.fulfilled, (state, action) => {
        state.loading = false;
        state.pastries = action.payload;
      })
      .addCase(fetchPastries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pastriesSlice.reducer;