//App.tsx
import React from "react";
import "./App.css";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import Header from "./components/Header/Header";
import { apiKey, location } from "./constants/constants";
import { Provider } from "react-redux"; // redux-toolkit
import store from "./store/store"; // redux-toolkit
import Body from "./components/Body/Body";

const lang = "ru_RU";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Body />
      </Provider>
    </>
  );
}

export default App;
