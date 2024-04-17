import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [type, setType] = useState("");
  const [empno, setEmpNo] = useState("");
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          let url = "";
          // http://myportal.silvermillgroup.lk:8080/CSR/LandRegistration.php
          // http://myportal.silvermillgroup.lk:8080/CSR/MemberRegistration.php
          // http://localhost/CSR/Record_Keeping.php
          if (type === "land") {
            url = `http://myportal.silvermillgroup.lk:8080/CSR/LandRegistration.php?latitude=${encodeURIComponent(
              latitude
            )}&longitude=${encodeURIComponent(
              longitude
            )}&type=${encodeURIComponent(type)}&epf=${encodeURIComponent(
              empno
            )}`;
          } else if (type === "rec") {
            url = `http://http://116.12.80.10:8080/CSR/Record_Keeping.php?latitude=${encodeURIComponent(
              latitude
            )}&longitude=${encodeURIComponent(
              longitude
            )}`;
          } else {
            url = `http://myportal.silvermillgroup.lk:8080/CSR/MemberRegistration.php?latitude=${encodeURIComponent(
              latitude
            )}&longitude=${encodeURIComponent(
              longitude
            )}&type=${encodeURIComponent(type)}&empno=${encodeURIComponent(
              empno
            )}`;
          }

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

  useEffect(() => {
    // Function to parse query parameters from URL
    const getQueryParam = name => {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    };

    // Usage
    const type = getQueryParam("type");
    const empno = getQueryParam("empno");
    setType(type);
    setEmpNo(empno);
  }, []);

  return (
    <div className="container">
      <h1>Land Location Measure Project</h1>
      <button onClick={getUserLocation}>Reload Location !</button>
      <div className="location-info">
        {userLocation &&
          <div>
            <h2>Get Locations BY app</h2>
            <div className="latitude-info">
              <p>
                Latitude Web: {userLocation.latitude}
              </p>
            </div>
            <div className="longitude-info">
              <p>
                Longitude Web: {userLocation.longitude}
              </p>
            </div>
            <div className="longitude-info">
              <p>
                Type: {type}
              </p>
            </div>
            <div id="map" />
          </div>}
      </div>
    </div>
  );
}

export default App;
