//slice.ts
import { createSlice } from "@reduxjs/toolkit";

export interface State {
  language: string;
  pointType: string;
}

const initialState: State = {
  language: "ru_RU",
  pointType: "",
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
});

export const { setLanguage, setPointType } = userSlice.actions;

export default userSlice.reducer;
