import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const googleMapsApiKey = 'AIzaSyDd-FzM-sn1lkEjFKxSTu5D6lDHpKXO89I'; // Replace with your Google Maps API Key

const MapComponent = () => {
  const [vehiclePosition, setVehiclePosition] = useState({ lat: 37.7749, lng: -122.4194 });
  const [path, setPath] = useState([{ lat: 37.7749, lng: -122.4194 }]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('http://localhost:5000/api/vehicle-position')
        .then(response => {
          const { lat, lng } = response.data;
          setVehiclePosition({ lat, lng });
          setPath(prevPath => [...prevPath, { lat, lng }]);
        })
        .catch(error => console.error(error));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <LoadScript googleMapsApiKey={AIzaSyDd-FzM-sn1lkEjFKxSTu5D6lDHpKXO89I}>
      <GoogleMap mapContainerStyle={containerStyle} center={vehiclePosition} zoom={12}>
        <Marker position={vehiclePosition} />
        <Polyline path={path} options={{ strokeColor: '#FF0000' }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
