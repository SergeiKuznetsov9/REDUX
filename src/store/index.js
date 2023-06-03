import { configureStore } from "@reduxjs/toolkit";

import heroesReducer from "./slices/heroesSlice";
import filtersReducer from "./slices/filtersSlice";

export const store = configureStore({
  reducer: { heroesReducer, filtersReducer },
});
