import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
  activeFilters: ["all"],
};


export const fetchFiltersAsyncThunk = createAsyncThunk(
  "filters/fetchFiltersAsyncThunk",
  async () => {
    const res = await fetch("http://localhost:3001/filters");
    const res1 = await res.json();
    return res1;
  }
);

export const addFilterThunk =
  ({ filterName, activeFilters }) =>
  (dispatch) => {
    if (filterName === "all") {
      dispatch(toggleFilter(["all"]));
      return;
    }

    const newActiveFilters = activeFilters.filter(
      (filter) => filter !== "all" && filter !== filterName
    );

    if (activeFilters.indexOf(filterName) === -1)
      newActiveFilters.push(filterName);

    if (!newActiveFilters.length) newActiveFilters.push("all");

    dispatch(toggleFilter(newActiveFilters));
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





  extraReducers: (builder) => {
    builder
      .addCase(fetchFiltersAsyncThunk.fulfilled, (state, action) => {
        state.filters = action.payload;
      })




      .addDefaultCase(() => {});
  },







});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { elementOptionsFetched, toggleFilter } = actions;
