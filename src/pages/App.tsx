//App.tsx
import React from "react";
import "./App.css";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { apiKey, location } from "../constants/constants";
import { Provider } from "react-redux"; // redux-toolkit
import store from "../store/store"; // redux-toolkit
import Body from "../components/Map";

const lang = "ru_RU";

function App() {
  return (
    <>
      <Provider store={store}>
        <Body />
      </Provider>
    </>
  );
}

export default App;
