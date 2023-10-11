import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./states/auth";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
