import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const AdminApiSlice = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3001/api"}),
    endpoints: (builder) => ({
        getAllItems: builder.query({
            query: () => ({
                url: "/pastries",
                method: "GET",
            }),
        }),
        addNewItem: builder.mutation({
            query: (item) => ({
                url: "/pastrie",
                method: "POST",
                body: item,
            }),
        }),
        editItem: builder.mutation({
            query: (item) => ({
                url: `/pastrie/${item.id}`,
                method: "PUT",
                body: item,
            }),
        }),
        deleteItem: builder.mutation({
            query: (id) => ({
                url: `/pastrie/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {useGetAllItemsQuery, useAddNewItemMutation, useEditItemMutation, useDeleteItemMutation} = AdminApiSlice;
