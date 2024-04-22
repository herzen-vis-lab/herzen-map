//Body.tsx
import React, {useState, useEffect}  from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { apiKey, location } from "../../constants/constants";
import useUserData from "../../hooks/useUserData"; // хук для redux-toolkit чтение

const Body = () => {
  const [state, setState] = useState("ru_RU");
  const userData = useUserData();

  useEffect(() => {
    if (userData[0] && state !== userData[0]) {
      setState(userData[0]);
    }
  }, [userData, state]); 
 
  return (
  <>
    <div>state = {state}</div>
    <YMaps key={state} query={{ apikey: apiKey, lang: state === "ru_RU" ? "ru_RU" : "en_US"  }}>
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
   </>
  );
};
export default Body;
