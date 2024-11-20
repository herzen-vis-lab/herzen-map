import { Placemark } from "@pbe/react-yandex-maps";
import { presetsByTypeId } from "constants/constants";

interface Point {
  longitude: string;
  latitude: string;
  names: Record<string, string>;
  descriptions: Record<string, string>;
  web: string;
  type_id: number | string;
  picture: string;
  status_id: number;
}

export const getPlacemarks = (
  points: Point[],
  language: string
) => {
  const selectedTypeIds = localStorage.getItem("selectedTypeIds");
  const typeIdsFilter: number[] = selectedTypeIds
    ? JSON.parse(selectedTypeIds)
    : [];

  return points
    .filter((point) => {
      const numericTypeId = Number(point.type_id);
      return (
        point.status_id === 1 &&
        (typeIdsFilter.length === 0 || typeIdsFilter.includes(numericTypeId))
      );
    })
    .map((point) => {
      const {
        longitude,
        latitude,
        names,
        descriptions,
        web,
        type_id,
        picture,
      } = point;

      const numericTypeId = Number(type_id);
      const preset = presetsByTypeId[numericTypeId] || "islands#blueLeisureIcon";

      return (
        <Placemark
          key={`${longitude}-${latitude}`}
          modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
          defaultGeometry={[longitude, latitude]}
          options={{ preset }}
          properties={{
            hintContent: names[language],
            balloonContentHeader: `
              <div class="placemark-header">
                <h3>${names[language]}</h3>
              </div>
            `,
            balloonContentBody: `
              <div class="placemark-body">
                <div class="placemark-description">
                  ${descriptions[language]}
                </div>
                ${picture ? `
                  <div class="placemark-photo">
                    <img src="${picture}" alt="Фото точки">
                  </div>
                ` : ''}
              </div>
            `,
            balloonContentFooter: `<a href="${web}">Ссылка на источник</a>`,
          }}          
        />
      );
    });
};