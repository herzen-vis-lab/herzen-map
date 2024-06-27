// getPoints.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectId } from "../../constants/constants";
const apiHost = process.env.API_HOST;
const apiPort = process.env.API_PORT;

const pointsUrl = apiHost + ":" + apiPort + "/api/point/project/" + projectId;

export const getPoints = createAsyncThunk("fetchPointsData", async () => {
  const response = await fetch(pointsUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
});
