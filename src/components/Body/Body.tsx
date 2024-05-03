//Body.tsx
import React, {useState, useEffect}  from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { apiKey, location } from "../../constants/constants";
import useUserData from "../../hooks/useUserData"; // хук для redux-toolkit чтение
import { useDispatch } from "react-redux";
import * as api from "../../api";
import type { AppDispatch } from '../../store/store'; // подтягиваем тип для useDispatch

const Body = () => {

// state для повторного рендеринга в блоке return
  const [language, setLanguage] = useState("ru_RU");
  const [pointType, setPointType] = useState("");
  const [points, setPoints] = useState([]);

// читаем из store
  const userData = useUserData();

  useEffect(() => {
    if (userData[0] && language !== userData[0]) {
      setLanguage(userData[0]);
    }
  }, [userData, language]);

  useEffect(() => {
    if (userData[1] && pointType !== userData[1]) {
      setPointType(userData[1]);
    }
  }, [userData, pointType]);

  useEffect(() => {
    if (userData[2] && points !== userData[2]) {
      setPoints(userData[2]);
    }
  }, [userData, points]);

// пишем в store 
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(api.points.getPoints());
  }, [dispatch]);

 console.log(points);

 const balloonText = language === "ru_RU" ? "Скульптурный монумент русскому педагогу и писателю К. Д. Ушинскому." : "Text on English";   

 return (
  <>

    <YMaps key={language} query={{ apikey: apiKey, lang: language === "ru_RU" ? "ru_RU" : "en_US" }}>
      <Map
        defaultState={{
          center: [location.center[1], location.center[0]],
          zoom: location.zoom,
          controls: ["zoomControl", "fullscreenControl"],
        }}
        modules={["control.ZoomControl", "control.FullscreenControl"]}
	width="90%"
        height="500px"
      >
        <Placemark
          modules={["geoObject.addon.balloon"]}
          defaultGeometry={[59.934557, 30.319471]}
          properties={{
            balloonContentBody: balloonText.toString(),
          }}
        />
      </Map>
    </YMaps>
   </>
  );
};

export default Body;
