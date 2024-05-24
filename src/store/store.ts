import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice";
import mapSettingsSlice from "./mapSettingsSlice";

const store = configureStore({
  reducer: {
    userData: userSlice,
    mapSettings: mapSettingsSlice
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
