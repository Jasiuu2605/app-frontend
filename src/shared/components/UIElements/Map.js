import React, { useEffect, useRef } from "react";

import "./Map.css";

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    async function initMap() {
      const { Map } = await window.google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary(
        "marker"
      );

      const map = new Map(mapRef.current, {
        zoom: zoom,
        center: center,
        mapId: "DEMO_MAP_ID",
      });

      new AdvancedMarkerElement({
        map: map,
        position: center,
        title: "",
      });
    }

    initMap();
  }, [center, zoom]);
  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
