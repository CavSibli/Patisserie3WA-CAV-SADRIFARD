import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    patisserie: [],
    status: "idle",
}

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: create => ({
        winning: create.reducer((state, action) => {
            state.count = action.payload.count
            state.patisserie = action.payload.patisserie
        }),
    }),
    selectors: {
        selectCount: state => state.count,
        selectPatisserie: state => state.patisserie,
    }
})

export const {winning} = gameSlice.actions

export const selectCount = gameSlice.selectors.selectCount
export const selectPatisserie = gameSlice.selectors.selectPatisserie
