import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUrl } from "api/config"; 
import { projectId } from "constants/constants";
import { apiClient } from "api/apiClient";

const pointsUrl = `${apiUrl}/api/point/project/${projectId}`;

export const getAllPoints = createAsyncThunk("fetchPointsData", async () => {
  const response = await apiClient(pointsUrl, {
     method: 'GET'
  });
  return response.data;
});