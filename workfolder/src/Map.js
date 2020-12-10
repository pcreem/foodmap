import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "./Map.css";



function Map({ center, zoom, list }) {

  function ChangeMap({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }

  return (
    <div className="map">
      {/* <MapContainer scrollWheelZoom={false}> */}
      <MapContainer >
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {list?.map(item => (
          <Marker position={[item.data.lat, item.data.long]}>
            <Popup>
              <div className="map__popup">
                <h3>{item.data.name}</h3>

                Address: {item.data.address}
                <br />
                Openhours: {item.data.openhours}
                <br />
                note: {item.data.restrict}
                <br />
                Contact: {item.data.contact}
              </div>

            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}

export default Map;