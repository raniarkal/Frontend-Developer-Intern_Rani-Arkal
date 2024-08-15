const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

let vehiclePosition = { lat: 37.7749, lng: -122.4194 }; // Initial position

app.get('/api/vehicle-position', (req, res) => {
  // Simulate vehicle movement
  vehiclePosition = {
    lat: vehiclePosition.lat + (Math.random() - 0.5) * 0.01,
    lng: vehiclePosition.lng + (Math.random() - 0.5) * 0.01,
  };
  res.json(vehiclePosition);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
