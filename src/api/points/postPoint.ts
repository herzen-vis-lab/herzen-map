import { apiUrl } from "../config";
import { apiClient } from "../apiClient";


export const postPoint = (
  async (pointId: string) => {
    const pointsUrl = `${apiUrl}/api/point/id/${pointId}`;
    const response = await apiClient(pointsUrl, {
      method: 'POST'
   });
    return response.data;
  }
);