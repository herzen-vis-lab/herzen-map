// getPoints.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { projectId } from "../../constants/constants";
const apiUrl = 'https://api-map.herzen.spb.ru'; 

const pointsUrl = apiUrl + '/api/point/project/' + projectId;

export const getPoints = createAsyncThunk("fetchPointsData", async () => {
  const response = await fetch(pointsUrl);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  data.pointsUrl = pointsUrl;
  return data.data;
});
