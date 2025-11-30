import React, { CSSProperties, useEffect, useRef } from 'react';

import './Map.css';
import '../../util/initGoogleMaps';

type MapProps = {
  center: { lat: number; lng: number };
  zoom: number;
  className?: string;
  style?: CSSProperties;
};

function Map(props: MapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const { center, zoom } = props;

  useEffect(() => {
    async function initMap() {
      const google = (window as any).google;
      if (!google || !mapRef.current) return;

      const { Map } = await google.maps.importLibrary('maps');
      const { AdvancedMarkerElement } = await google.maps.importLibrary(
        'marker'
      );

      const map = new Map(mapRef.current, {
        zoom: zoom,
        center: center,
        mapId: 'DEMO_MAP_ID',
      });

      new AdvancedMarkerElement({
        map: map,
        position: center,
        title: '',
      });
    }

    initMap();
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className || ''}`}
      style={props.style}
      id='map'
    ></div>
  );
}

export default Map;
