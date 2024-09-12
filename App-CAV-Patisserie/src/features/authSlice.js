import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // importer les fonction redux pour creer des slices et créer des actions asynchrone pour gerer une requete API

const BACKEND_URL = 'http://localhost:3001'; //base de l'url du Backend 

//
export const loginUser = createAsyncThunk(
  'auth/loginUser', //type 
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_URL}/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),  
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur de connexion');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);  
      return data.user; 
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token'); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;  
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;