import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/usersSlice";
// Store

const store = configureStore({
  reducer: {
    usersReducer: usersReducer,
  },
});

export default store;
