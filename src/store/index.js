import { configureStore } from "@reduxjs/toolkit";
import { heroesQuerySlice } from "./rtkQuery/heroesQuerySlice";

import filtersReducer from "./slices/filtersSlice";
import { filtersQuerySlice } from "./rtkQuery/filtersQuerySlice";

export const store = configureStore({
  reducer: {
    filtersReducer,
    [heroesQuerySlice.reducerPath]: heroesQuerySlice.reducer,
    [filtersQuerySlice.reducerPath]: filtersQuerySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      heroesQuerySlice.middleware,
      filtersQuerySlice.middleware
    ),
});
