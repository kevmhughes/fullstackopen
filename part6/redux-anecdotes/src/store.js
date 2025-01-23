import { configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
  devTools: import.meta.env.MODE !== "production",
});

export default store;
