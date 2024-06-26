import React from "react";

import "./Map.css";

const Map = (props) => {

  return (
    <div
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
