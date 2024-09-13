import { configureStore } from '@reduxjs/toolkit';
import { GameAPISlice } from '../features/game/game-api.js';
import { gameSlice } from '../features/game/game-slice.js';
import { AdminApiSlice } from "../features/admin/admin-api.js";

export const store = configureStore({
    reducer: {
        [GameAPISlice.reducerPath]: GameAPISlice.reducer,
        [AdminApiSlice.reducerPath]: AdminApiSlice.reducer,
        game: gameSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(GameAPISlice.middleware, AdminApiSlice.middleware),
});
