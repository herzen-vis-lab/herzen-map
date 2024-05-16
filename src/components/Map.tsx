//Body.tsx
import React, {useState, useEffect}  from "react";
import { YMaps, Map, Placemark, Button, ListBox, ListBoxItem, GeolocationControl } from "@pbe/react-yandex-maps";
import { apiKey, location } from "../constants/constants";
import useUserData from "../hooks/useUserData"; // хук для redux-toolkit чтение
import { useDispatch } from "react-redux";
import * as api from "../api";
import type { AppDispatch } from '../store/store'; // подтягиваем тип для useDispatch
import serverPoints from "../api/MapService/points.json";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Body = () => {
    const { t, i18n } = useTranslation();

    function GetYMapsLanguage(lang: string) {
        switch (lang)
        {
            case "ru":
                return "ru_RU"
            case "en":
                return "en_US"
            case "zh":
                return "en_US"
            default: 
                return "ru_RU"
        }
    }


    // state для повторного рендеринга в блоке return
    const [pointType, setPointType] = useState("");
    const [points, setPoints] = useState([]);

    // читаем из store
    const userData = useUserData();

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

    function GetPlacemarks() {
        return serverPoints.points.map((point) => <Placemark
            modules={["geoObject.addon.balloon"]}
            defaultGeometry={[point.longitude, point.latitude]}
            properties={{
                iconContent: "К",
                iconCaption:  point.locales[0].name,
                balloonContentHeader: point.locales[0].name,
                balloonContentBody: point.locales[0].description
            }}
        />)
    }

    return (
    <>
        <YMaps key={GetYMapsLanguage(i18n.language)} query={{ apikey: apiKey, lang: GetYMapsLanguage(i18n.language) }}>
            <Map
            defaultState={{
                center: [location.center[1], location.center[0]],
                zoom: location.zoom,
                controls: ["zoomControl", "fullscreenControl"],
            }}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
            width="100vw"
            height="100vh"
            >
            {GetPlacemarks()}
            <GeolocationControl options={{ float: "left" }} />
            <ListBox data={{ content: t("language") }}>
                {Array
                    .from(languages.keys()) 
                    .map(language => 
                        <ListBoxItem 
                        data={{content: languages.get(language)}}/>)}
            </ListBox>
            </Map>
        </YMaps>
    </>
    );
};

export default Body;
