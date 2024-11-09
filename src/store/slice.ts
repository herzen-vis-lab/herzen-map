import { createSlice } from "@reduxjs/toolkit";
import * as api from "api";


export type PointItem = {
  id: string;
  longitude: string,
  latitude: string,
  status: string,
  type: string,
  photos: [],
  videos: [],
  web: string,
  locales: [{
    local: string,
    name: string, 
    description: string,
  }]
};

export interface State {
  language: string;
  pointType: string;
  points: {
    // 2 уровень хранилища - информация о ситуациях;
    data: PointItem[];
    loading: boolean;
    error: any;
  };
}

const initialState: State = {
  language: "ru",
  pointType: "",
  points: {
    data: [],
    loading: true,
    error: "",
  },
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setPointType: (state, action) => {
      state.pointType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(api.points.getAllPoints.pending, (state) => {
        state.points.loading = true;
      })
      .addCase(api.points.getAllPoints.fulfilled, (state, action) => {
        state.points.data = action.payload;
        state.points.loading = false;
        state.points.error = null;
      })
      .addCase(api.points.getAllPoints.rejected, (state, action) => {
        state.points.loading = false;
        state.points.error = action.error;
      });
  }
});

export const { setLanguage, setPointType } = userSlice.actions;

export default userSlice.reducer;
