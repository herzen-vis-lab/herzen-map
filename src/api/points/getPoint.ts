import { apiUrl } from "../config";
import { apiClient } from "../apiClient";


export const getPoint = (
  async (pointId: string) => {
    const pointsUrl = `${apiUrl}/api/point/id/${pointId}`;
    const response = await apiClient(pointsUrl, {
      method: 'GET'
   });
    return response.data;
  }
);