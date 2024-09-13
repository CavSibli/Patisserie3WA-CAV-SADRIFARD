import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const AdminApiSlice = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/api"}),
    endpoints: (builder) => ({
        getAllItems: builder.query({
            query: () => ({
                url: "/pastries",
                method: "GET",
                credentials: "include",
            }),
        }),
        addNewItem: builder.mutation({
            query: (item) => ({
                url: "/pastrie",
                method: "POST",
                body: item,
                credentials: "include",
            }),
        }),
        editItem: builder.mutation({
            query: (item) => ({
                url: `/pastrie/${item.id}`,
                method: "PUT",
                body: item,
                credentials: "include",

            }),
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/pastrie/${id}`,
                method: "DELETE",
                credentials: "include",

            }),
        }),
    }),
});

export const {useGetAllItemsQuery, useAddNewItemMutation, useEditItemMutation, useDeleteItemMutation} = AdminApiSlice;
