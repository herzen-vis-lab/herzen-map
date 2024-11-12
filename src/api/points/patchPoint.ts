import { apiUrl } from "api/config";
import { apiClient } from "api/apiClient";
import { Point } from "components/Admin/type";


export const patchPoint = async (pointId: string, data: Partial<Point>) => {
  const pointsUrl = `${apiUrl}/api/point/id/${pointId}`;
  const response = await apiClient(pointsUrl, {
    method: 'PATCH',
    body: data,
  });
  return response;
};
