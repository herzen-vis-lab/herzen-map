//Body.tsx
import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { apiKey, location } from "../../constants/constants";
import useUserData from "../../hooks/useUserData"; // хук для redux-toolkit чтение

const language = "ru_RU";

const Body = () => {
  const userData = useUserData();
  if (userData[0]) {
    console.log(userData[0], typeof userData[0]);
    const language = userData[0];
    console.log(language, typeof language);
  }

  return (
    <YMaps query={{ apikey: apiKey, lang: language }}>
      <Map
        defaultState={{
          center: [location.center[1], location.center[0]],
          zoom: location.zoom,
          controls: ["zoomControl", "fullscreenControl"],
        }}
        modules={["control.ZoomControl", "control.FullscreenControl"]}
      >
        <Placemark
          modules={["geoObject.addon.balloon"]}
          defaultGeometry={[55.75, 37.57]}
          properties={{
            balloonContentBody:
              "This is balloon loaded by the Yandex.Maps API module system",
          }}
        />
      </Map>
    </YMaps>
  );
};
export default Body;
