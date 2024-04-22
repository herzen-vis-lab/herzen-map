import React from "react";
import {
  apiKey,
  lang,
  location as LOCATION,
  initialPoint,
} from "../../constants/constants";

const Map = () => {
  return (
    <div>
      {apiKey} {lang}
    </div>
  );
};

export default Map;
