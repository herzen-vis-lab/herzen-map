import {
Button as MUIButton,
IconButton,
TextField,
InputAdornment,
AppBar,
Toolbar,
Select,
MenuItem,
Box,
ThemeProvider,
createTheme,
InputLabel,
FormControl,
makeStyles,
Modal,
styled,
FormGroup,
FormControlLabel,
Checkbox,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import LayersIcon from '@mui/icons-material/Layers';
import React, {useState, useEffect, useRef}  from "react";
import { YMaps, Map, Placemark, Button, ListBox, ListBoxItem, GeolocationControl, SearchControl, RouteButton, RoutePanel, TypeSelector } from "@pbe/react-yandex-maps";
import { apiKey, location } from "../constants/constants";
import { useDispatch } from "react-redux";
import * as api from "../api";
import useUserData from "../hooks/useUserData"; // хук для redux-toolkit чтение
import useMapSettings from "../hooks/useMapSettings"; // хук для redux-toolkit чтение
import type { AppDispatch } from '../store/store'; // подтягиваем тип для useDispatch
//import serverPoints from "../api/MapService/points.json";
import { useTranslation } from "react-i18next";
import { languages } from "../i18n";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { debug } from "console";
 

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.default',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const FieldContainer = styled(Box)(({ theme }) => ({

    display: 'flex',
    width: '100%',
    alignItems: 'center',
  }));

const initialPoints = {
  "data": [{
    "id": "1",
    "longitude": "",
    "latitude": "",
    "status": "",
    "type": "",
    "photos": [],
    "videos": [],
    "web": "",
    "locales": [
      {"local": "RU", "name": "", "description": ""},
      {"local": "EN", "name": "", "description": ""},
      {"local": "CH", "name": "", "description": ""}
    ]
  }],
  "loading": '',
  "error": ''
};

export default function MapWrapper() {
    // const [newCoords, setNewCoords] = useState([
    //     47.06587193746529,
    //     39.435380396518724
    //   ]);
    // const [address, setAddress] = useState("");
    // const [value, setValue] = useState("");
    // const [options, setOptions] = useState([]);
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const { t, i18n } = useTranslation();
    const [lang, setLang] = React.useState(GetYMapsLanguage(i18n.language));
    function GetYMapsLanguage(lang: string) {
        switch (lang)
        {
            case "Русский":
                return "ru_RU"
            case "English":
                return "en_US"
            case "中国人":
                return "en_US"
            default: 
                return "ru_RU"
        }
    }
  
      // state для повторного рендеринга в блоке return
      const [pointType, setPointType] = useState("");
      const [points, setPoints] = useState(initialPoints);
  
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
     
      console.log('MapWrapper points', points);
      function GetPlacemarks() {
  	console.log(lang);
  	
	let langPosKey: number;
  	switch (lang) {
    		case "English":
      			langPosKey = 1;
      		break;
    		case "中国人":
      			langPosKey = 2;
      		break;
    		default:
      			langPosKey = 0;
 	 }  
	
	return points.data.map((point) => 
			<Placemark modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              			defaultGeometry={[point.longitude, point.latitude]}
             			options={{
                  		//draggable: true,
                  			preset: 'islands#blueLeisureCircleIcon',
              			}}
              			properties={{
                  			hintContent: point.locales[langPosKey].name,
                  			balloonContentHeader: point.locales[langPosKey].name,
                  			balloonContentBody: point.locales[langPosKey].description,
					balloonContentFooter: '<a href = ' + point.web.toString() + '>' + 'Ссылка на источник' + '</a>'
              			}}
          />)
    }
  
    return (
      <>
        <Box height="var(--app-height)" display="flex" flexDirection="column">
            <AppBar position="static">
                <Toolbar variant="dense">
                <Box sx={{ flexGrow: 1, display: 'flex' }}>
                    <FormControl sx={{width: "120px", flexDirection: "row"}}>
                        <Select 
                            value={i18n.language}
                            onChange={(e) => {e.target.value = i18n.language}}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{
                                color: "white",
                                "& .MuiSvgIcon-root": { color: "white" },
                                borderRadius: "0px" //not working
                            }}
                            IconComponent={LanguageIcon}>
                            {Array
                                .from(languages.keys()) 
                                .map(languageCode => 
                                    {
                                        const language = languages.get(languageCode);
                                        return <MenuItem 
                                            value={language} 
                                            onClick={() => {
                                                i18n.changeLanguage(language);
                                                setLang(GetYMapsLanguage(i18n.language))}}>     
                                            {language}
                                        </MenuItem>
                                    })}
                        </Select>
                    </FormControl>
                </Box>
                    <IconButton color='inherit' onClick={handleOpen}>
                        <LayersIcon/>
                    </IconButton>
                    {/* <IconButton onClick={locateMe}>
                    <MyLocation />
                    </IconButton>
                    <IconButton onClick={refreshData}>
                    <Refresh />
                    </IconButton> */}
                </Toolbar>
            </AppBar>
            <YMaps
            key={lang}
            //@ts-ignore
            query={{ apikey: apiKey, lang }}>
            <Map
                    defaultState={{
                        center: [location.center[1], location.center[0]],
                        zoom: location.zoom,
                        controls: ["zoomControl", "fullscreenControl"],
                    }}
                    modules={["control.ZoomControl", "control.FullscreenControl", 'geocode', 'geolocation', "coordSystem.geo", "util.bounds"]}
                    width="100vw"
                    height="100vh"
                    >
                        <RouteButton></RouteButton>
                        {GetPlacemarks()}
                        <GeolocationControl options={{ float: "left" }} />
                        <SearchControl options={{ float: "left" }} />
                        {/* <Placemark
                instanceRef={ref}
                onDragEnd={() => {
                    const coords = ref.current.geometry._coordinates;
                    setNewCoords(() => coords);
                    //@ts-ignore
                    ymaps.current.geocode(coords).then((res) => {
                    const  firstGeoObject = res.geoObjects.get(0);
                    const newAddress = [
                        firstGeoObject.getLocalities().length
                        ? firstGeoObject.getLocalities()
                        : firstGeoObject.getAdministrativeAreas(),
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
                        firstGeoObject.getPremiseNumber()
                    ]
                        .filter(Boolean)
                        .join(", ");
                    ref.current.getMap().hint.open(coords, newAddress);
                    setAddress(() => newAddress);
                    setValue(() => newAddress);
                    });
                }}
                geometry={newCoords}
                options={{
                    iconImageSize: [30, 30],
                    draggable: true,
                    preset: "islands#greenIcon",
                    hideIconOnBalloonOpen: false,
                    openEmptyHint: true
                }}
                properties={{
                    iconContent: "+",
                    hintContent: address
                }}
                /> */}
                    </Map>
            </YMaps>
        </Box>

        <Modal 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="modal-modal-title" 
        aria-describedby="modal-modal-description">
            <Box sx={modalStyle}>
                <h1>{t('site settings')}</h1>
                <FieldContainer marginBottom={1}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox defaultChecked />} label="Категория 1" />
                        <FormControlLabel required control={<Checkbox />} label="Категория 2" />
                        <FormControlLabel disabled control={<Checkbox />} label="Категория 3" />
                    </FormGroup>
                </FieldContainer>
            </Box>
        </Modal>
      </>
    );
  }
