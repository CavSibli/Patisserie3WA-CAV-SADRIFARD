import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import pastriesReducer from '../features/pastriesSlice';  

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pastries: pastriesReducer,  
  },
});

export default store;