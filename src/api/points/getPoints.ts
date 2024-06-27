// getPoints.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectId } from "../../constants/constants";
const apiUrl = process.env.API_URL; //XX.XX.XX.XX:3000

const pointsUrl = apiUrl + "/api/point/project/" + projectId;

export const getPoints = createAsyncThunk("fetchPointsData", async () => {
  const response = await fetch(pointsUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
});
