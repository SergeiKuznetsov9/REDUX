import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeFilters: ["all"],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      state.activeFilters = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { toggleFilter } = actions;
