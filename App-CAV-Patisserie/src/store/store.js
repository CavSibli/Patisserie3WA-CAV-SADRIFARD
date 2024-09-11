import { configureStore } from '@reduxjs/toolkit';
import { GameAPISlice } from '../features/game/game-api.jsx';
import { gameSlice } from '../features/game/game-slice.jsx';

export const store = configureStore({
    reducer: {
        [GameAPISlice.reducerPath]: GameAPISlice.reducer,
        game: gameSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(GameAPISlice.middleware),
});
