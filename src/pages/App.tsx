//App.tsx
import React from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { apiKey, location } from "../constants/constants";
import { Provider } from "react-redux"; // redux-toolkit
import store from "../store/store"; // redux-toolkit
import MapWrapper from "../components/MapWrapper";

const lang = "ru_RU";

function App() {
  return (
    <>
      <Provider store={store}>
        <MapWrapper />
      </Provider>
    </>
  );
}

export default App;
