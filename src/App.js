import React, { useState, useEffect } from "react";
function App() {
  const [userLocation, setUserLocation] = useState(null);
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const url = `http://localhost/index.php?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`;
          window.location.href = url;
          setUserLocation({ latitude, longitude });
        },
        error => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  useEffect(
    () => {
      if (userLocation) {
        // Load Bing Maps API script dynamically
        const script = document.createElement("script");
        script.src =
          "https://www.bing.com/api/maps/mapcontrol?key=Aj_sNeyXlOTTq5HnqbrenzIu7Ar3DYlbTbyJ7NQoBf9vwThtZyrANUxW_lbvXCkD&callback=initMap";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // Set up the callback function for when the script has loaded
        window.initMap = () => {
          const map = new window.Microsoft.Maps.Map(
            document.getElementById("map"),
            {
              center: new window.Microsoft.Maps.Location(
                userLocation.latitude,
                userLocation.longitude
              ),
              zoom: 12
            }
          );

          const userLocationPin = new window.Microsoft.Maps.Pushpin(
            map.getCenter(),
            null
          );
          map.entities.push(userLocationPin);
        };
      }
    },
    [userLocation]
  );

  return (
    <div>
      <h1>Geolocation App</h1>
      <button onClick={getUserLocation}>Get Location</button>
      {userLocation &&
        <div>         
          <h2>Locations</h2>          
          <p>
            Latitude: {userLocation.latitude}
          </p>
          <p>
            Longitude: {userLocation.longitude}
          </p>
          <div id="map" style={{ width: "100%", height: "400px" }} />
        </div>}
    </div>
  );
}

export default App;
