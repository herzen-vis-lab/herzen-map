import {
  IconButton,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  Box,
  FormControl,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import LayersIcon from "@mui/icons-material/Layers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import {
  YMaps,
  Map,
  GeolocationControl
} from "@pbe/react-yandex-maps";
import { apiKey, location } from "constants/constants";
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
import { TypesModal } from "./TypesModal";
import { getPlacemarks } from "./getPlacemarks";
import { AdsBanner } from "components";

const MapWrapper = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(getYMapLanguage(i18n.language));
  const [openModal, setOpenModal] = useState(false);
  const [pointType, setPointType] = useState('');
  const [points, setPoints] = useState(initialPoints);
  const userData = useUserData();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleLogin = () => {
    navigate(`/login`);
  };

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

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(api.points.getAllPoints());
  }, [dispatch]);

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
                    const selectedLang = e.target.value;
                    i18n.changeLanguage(selectedLang);
                    setLang(getYMapLanguage(selectedLang));
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
                          key={languageCode}
                          value={languageCode}
                          onClick={() => {
                            i18n.changeLanguage(languageCode);
                            setLang(getYMapLanguage(languageCode));
                          }}
                        >
                          {language}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
            </Box>
            <IconButton color="inherit" onClick={handleOpenModal}>
              <LayersIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleLogin}>
              <AccountCircleIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <YMaps key={lang} query={{ apikey: apiKey, lang }}>
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
            {getPlacemarks(points.data, i18n.language)}
            <GeolocationControl options={{ float: "left" }} />
          </Map>
        </YMaps>
      </div>
      <TypesModal open={openModal} onClose={handleCloseModal} />
      <AdsBanner />
    </>
  );
};

export default MapWrapper;