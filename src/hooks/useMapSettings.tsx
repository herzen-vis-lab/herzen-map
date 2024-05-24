import { useSelector } from "react-redux"; // redux-toolkit чтение

function useMapSettings() {
  const mapZoom = useSelector(
    (state: { mapSettings: { zoom: number } }) => state.mapSettings.zoom,
  );
  const mapLongitude = useSelector(
    (state: { mapSettings: { longitude: number } }) => state.mapSettings.longitude,
  );
  const mapLatitude = useSelector(
    (state: { mapSettings: { latitude: number } }) => state.mapSettings.latitude,
  );

  return [mapZoom, mapLongitude, mapLatitude];
}
export default useMapSettings;
