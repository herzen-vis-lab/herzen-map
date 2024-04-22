import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Header from "./components/Header/Header";
import { apiKey, lang } from "./constants/constants";

function App() {
  return (
    <>
      <Header />
      <YMaps query={{ apikey: apiKey, lang: lang }}>
        <Map
          defaultState={{
            center: [55.75, 37.57],
            zoom: 9,
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
      ;
    </>
  );
}

export default App;
