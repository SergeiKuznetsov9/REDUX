import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const filtersQuerySlice = createApi({
  reducerPath: "filtersQuerySlice",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Filters"],
  endpoints: (builder) => ({
    getFilters: builder.query({
      query: () => "/filters",
    }),
  }),
});

export const { useGetFiltersQuery } = filtersQuerySlice;
