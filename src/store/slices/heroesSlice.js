import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  heroCreatingStatus: "idle",
  heroRemovingStatus: "idle",
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched: (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = "idle";
    },
    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = "error";
    },
    heroCreating: (state) => {
      state.heroCreatingStatus = "loading";
    },
    heroCreated: (state, action) => {
      state.heroes.push(action.payload);
      state.heroCreatingStatus = "idle";
    },
    heroCreatingError: (state) => {
      state.heroCreatingStatus = "error";
    },
    heroRemoving: (state) => {
      state.heroRemovingStatus = "loading";
    },
    heroRemoved: (state, action) => {
      state.heroes = action.payload;
      state.heroRemovingStatus = "idle";
    },
    heroRemovingError: (state) => {
      state.heroRemovingStatus = "error";
    },
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreating,
  heroCreated,
  heroCreatingError,
  heroRemoving,
  heroRemoved,
  heroRemovingError,
} = actions;
