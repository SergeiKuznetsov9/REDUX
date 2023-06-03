import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  activeFilters: ["all"],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    elementOptionsFetched: (state, action) => {
      state.filters = action.payload;
    },
    toggleFilter: (state, action) => {
      state.activeFilters = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { elementOptionsFetched, toggleFilter } = actions;
