import { apiUrl } from "api/config";
import { apiClient } from "api/apiClient";
import { Point } from "components/Admin/type";


export const postPoint = async (data: Partial<Point>) => {
  const pointsUrl = `${apiUrl}/api/point`;
  const response = await apiClient(pointsUrl, {
    method: 'POST',
    body: data,
  });
  return response;
};