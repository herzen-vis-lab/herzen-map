// getPoints.ts
import { createAsyncThunk } from "@reduxjs/toolkit";

const clientId = "client1";
const url =
  "https://d5ddf1qedin3lactukpq.apigw.yandexcloud.net/api/client/" +
  clientId +
  "/cases";

export const getPoints = createAsyncThunk("fetchPointsData", async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.data;
});
