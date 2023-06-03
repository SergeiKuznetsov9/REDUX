import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  heroCreatingStatus: "idle",
  heroRemovingStatus: "idle",
};

export const fetchHeroesAsyncThunk = createAsyncThunk(
  "heroes/fetchHeroesAsyncThunk",
  async () => {
    const { request } = useHttp();
    const res = await fetch("http://localhost:3001/heroes");
    const res1 = await res.json();
    return res1;
  }
);

export const createHeroAsyncThunk = createAsyncThunk(
  "heroes/createHeroAsyncThunk",
  async (payload) => {
    const res = await fetch("http://localhost:3001/heroes", {
      method: "POST",
      body: JSON.stringify(payload.data),
      headers: { "Content-Type": "application/json" },
    });
    const res1 = await res.json();
    payload.reset()
    return res1;
  }
);

export const removeHeroAsyncThunk = createAsyncThunk(
  "heroes/removeHeroAsyncThunk",
  async (payload, { dispatch }) => {
    /*   const { request } = useHttp(); */
    console.log(payload.heroes);
    const res = await fetch(`http://localhost:3001/heroes/${payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const res1 = await res.json();
    dispatch(fetchHeroesAsyncThunk());
    return res1;
  }
);

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroesAsyncThunk.pending, (state) => {
        state.heroesLoadingStatus = "loading";
      })
      .addCase(fetchHeroesAsyncThunk.fulfilled, (state, action) => {
        state.heroesLoadingStatus = "idle";
        state.heroes = action.payload;
      })
      .addCase(fetchHeroesAsyncThunk.rejected, (state) => {
        state.heroesLoadingStatus = "error";
      })

      .addCase(createHeroAsyncThunk.pending, (state) => {
        state.heroCreatingStatus = "loading";
      })
      .addCase(createHeroAsyncThunk.fulfilled, (state, action) => {
        state.heroCreatingStatus = "idle";
        state.heroes.push(action.payload);
      })
      .addCase(createHeroAsyncThunk.rejected, (state) => {
        state.heroCreatingStatus = "error";
      })

      .addCase(removeHeroAsyncThunk.pending, (state) => {
        state.heroRemovingStatus = "loading";
      })
      .addCase(removeHeroAsyncThunk.fulfilled, (state, action) => {
        state.heroRemovingStatus = "idle";
        state.heroes.push(action.payload);
      })
      .addCase(removeHeroAsyncThunk.rejected, (state) => {
        state.heroRemovingStatus = "error";
      })

      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { heroRemoving, heroRemoved, heroRemovingError } = actions;
