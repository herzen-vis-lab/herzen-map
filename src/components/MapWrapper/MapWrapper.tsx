import {
  IconButton,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  Box,
  FormControl,
  Modal,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import LayersIcon from "@mui/icons-material/Layers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  SearchControl,
  RouteButton,
} from "@pbe/react-yandex-maps";
import { apiKey, location, presetsByTypeId } from "constants/constants";
import { useDispatch } from "react-redux";
import * as api from "api";
import useUserData from "hooks/useUserData"; // хук для redux-toolkit чтение
import { AppDispatch } from "store/store"; // подтягиваем тип для useDispatch
import { useTranslation } from "react-i18next";
import { languages } from "i18n";
import { getYMapLanguage } from "utils";
import { initialPoints } from "./initialPoints";
import "./MapWrapper.css";
import { useNavigate } from "react-router";


const MapWrapper = () => {
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(getYMapLanguage(i18n.language));
  const navigate = useNavigate();

  // state для повторного рендеринга в блоке return
  const [pointType, setPointType] = useState('');
  const [points, setPoints] = useState(initialPoints);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = () => {
    navigate(`/login`);
  }

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
    dispatch(api.points.getAllPoints());
  }, [dispatch]);

  console.log("NODE_ENV", process.env["NODE_ENV"].toString());

  const getPlacemarks = () => {
    return points.data
      .filter((point) => point.status_id === 1)
      .map((point) => {
        const {
          longitude,
          latitude,
          names,
          descriptions,
          web,
          type_id,
          picture
        } = point;
        const language = i18n.language as keyof typeof names;

        const numericTypeId = Number(type_id);
        const preset =
          presetsByTypeId[numericTypeId] || "islands#blueLeisureIcon";

        return (
          <Placemark
            modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
            defaultGeometry={[longitude, latitude]}
            options={{ preset }}
            properties={{
              hintContent: names[language],
              balloonContentHeader: names[language],
              balloonContentBody:
                                `<div class="placemark-description">
                                     ${descriptions[language]}
                                 </div>
                                 <div class="placemark-photo">
                                     <img src="${picture}" alt="">
                                 </div>`,
              balloonContentFooter: `<a href="${web}">Ссылка на источник</a>`,
            }}
          />
        );
      });
  }

  return (
    <>
      <div className="wrapper">
        <AppBar position="static">
          <Toolbar variant="dense">
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <FormControl sx={{ width: "120px", flexDirection: "row" }}>
                <Select
                  value={i18n.language}
                  onChange={(e) => {
                    e.target.value = i18n.language;
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    color: "white",
                    "& .MuiSvgIcon-root": { color: "white" },
                  }}
                  IconComponent={LanguageIcon}
                >
                  {Array.from(languages.keys()).map((languageCode) => {
                    const language = languages.get(languageCode);
                    return (
                      <MenuItem
                        key={language}
                        value={language}
                        onClick={() => {
                          i18n.changeLanguage(languageCode);
                          setLang(getYMapLanguage(language));
                        }}
                      >
                        {language}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <IconButton color="inherit" onClick={handleOpen}>
              <LayersIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogin}>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <YMaps
          key={lang}
          query={{ apikey: apiKey, lang }}
        >
          <Map
            defaultState={{
              center: [location.center[1], location.center[0]],
              zoom: location.zoom,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            modules={[
              "control.ZoomControl",
              "control.FullscreenControl",
              "geocode",
              "geolocation",
              "coordSystem.geo",
              "util.bounds",
            ]}
            width="100vw"
            height="100vh"
          >
            <RouteButton></RouteButton>
            {getPlacemarks()}
            <GeolocationControl options={{ float: "left" }} />
            <SearchControl options={{ float: "left" }} />
          </Map>
        </YMaps>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="settings-modal"
          sx={{
            backgroundColor: 'background.default',
            color: 'text.primary',
          }}>
          <h1>{t("site settings")}</h1>
          <Box className="fields-container">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Категория 1"
              />
              <FormControlLabel
                required
                control={<Checkbox />}
                label="Категория 2"
              />
              <FormControlLabel
                disabled
                control={<Checkbox />}
                label="Категория 3"
              />
            </FormGroup>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default MapWrapper;