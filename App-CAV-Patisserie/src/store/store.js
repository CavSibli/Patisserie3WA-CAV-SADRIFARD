import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import pastriesReducer from '../features/pastriesSlice';
import {GameAPISlice} from "../features/game/game-api.js";
import {AdminApiSlice} from "../features/admin/admin-api.js";
import {gameSlice} from "../features/game/game-slice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pastries: pastriesReducer,
    [GameAPISlice.reducerPath]: GameAPISlice.reducer,
    [AdminApiSlice.reducerPath]: AdminApiSlice.reducer,
    game: gameSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(GameAPISlice.middleware, AdminApiSlice.middleware),
});

export default store;
