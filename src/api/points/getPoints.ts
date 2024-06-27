// getPoints.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectId } from "../../constants/constants";
const apiHost = '95.174.95.90';
const apiPort = '3001'; 

const pointsUrl = 'http://' + apiHost + ':' + apiPort + '/api/point/project/' + projectId;

export const getPoints = createAsyncThunk("fetchPointsData", async () => {
  const response = await fetch(pointsUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  data.pointsUrl = pointsUrl;
  return data.data;
});
