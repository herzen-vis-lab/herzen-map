import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api";
import { apiKey, location } from "../constants/constants";

export type MapSettings = {
  zoom: number;
  longitude: number;
  latitude: number;
};

export interface State {
  mapSettings: MapSettings;
}

const initialState: State = {
  mapSettings: {
    zoom: location.zoom,
    longitude: location.center[0],
    latitude: location.center[1]
  }
};

export const userSlice = createSlice({
  name: "mapSettingsData",
  initialState,
  reducers: {
    setMapSettings: (state, action) => {
      state.mapSettings = action.payload;
    },
    setZoom: (state, action) => {
      state.mapSettings.zoom = action.payload
    },
    setLongitude: (state, action) => {
      state.mapSettings.longitude = action.payload
    },
    setLatitude: (state, action) => {
      state.mapSettings.latitude = action.payload
    }
  },
});

export const { setMapSettings, setZoom, setLatitude, setLongitude } = userSlice.actions;

export default userSlice.reducer;
