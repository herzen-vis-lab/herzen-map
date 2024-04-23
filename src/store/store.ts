//store.ts
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice"; // Подключение вашего reducer

const store = configureStore({
  reducer: {
    userData: userSlice,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
