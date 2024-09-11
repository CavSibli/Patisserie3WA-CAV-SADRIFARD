import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const GameAPISlice = createApi({
    reducerPath: "gameApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/game" }),
    endpoints: (builder) => ({
        getWinnersItems: builder.mutation({
            query: (count) => ({
                url: `/win-pastries/${count}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetWinnersItemsMutation } = GameAPISlice;
