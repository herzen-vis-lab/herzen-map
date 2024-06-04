// getPoints.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientId } from "../../constants/constants";

// const clientId = "1";
const url =
  "https://d5dj9ecjvrq0o7ovljs1.apigw.yandexcloud.net/api/client/" +
  clientId +
  "/points";

export const getPoints = createAsyncThunk("fetchPointsData", async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
});
