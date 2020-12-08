import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "./Map.css";

function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}


function Map({ center, zoom }) {
  const freesource = [
    {
      name: 'Kits Cares Café',
      address: '2396 W 8th Ave, Vancouver, BC',
      lat: 49.26451,
      long: -123.1598,
      opentime: 'Th 1:30-2:30pm',
      restrict: 'Sign up required',
      contact: 'kitscarescafe@tenth.ca'
    },
    {
      name: 'St Augustine\'s Anglican Church',
      address: '8680 Hudson St, Vancouver, BC',
      lat: 49.20724,
      long: -123.13431,
      opentime: 'Th 6-7pm',
      restrict: 'Maximum 2 dinners per guest',
      contact: '(604) 263-9212'
    },
    {
      name: 'Directions Youth Services',
      address: '1138 Burrard St, Vancouver, BC',
      lat: 49.27975,
      long: -123.12807,
      opentime: 'Snacks 24/7; Meal Daily 8-9 pm.',
      restrict: 'Youth under 25, homelessness or precariously housed',
      contact: ' (604)633-1472 directions@fsgv.ca'
    },
  ]

  return (
    <div className="map">
      <MapContainer scrollWheelZoom={false}>
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {freesource.map(institution => (
          <Marker position={[institution.lat, institution.long]}>
            <Popup>
              {institution.name}
              <br />
              {institution.address}
              <br />
              {institution.opentime}
              <br />
              {institution.restrict}
              <br />
              {institution.contact}
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}

export default Map;