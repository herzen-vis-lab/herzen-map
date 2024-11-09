import { apiUrl } from "api/config";
import { apiClient } from "api/apiClient";


export const patchPoint = (
  async (pointId: string) => {
    const pointsUrl = `${apiUrl}/api/point/id/${pointId}`;
    const response = await apiClient(pointsUrl, {
      method: 'PATCH'
   });
    return response.data;
  }
);