import React, { useState } from "react";
import moment from "moment";

const api = {
  key: "847fe7f05d4f2e00e711ba4f61157d24",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  var currentTime = moment().format("hh:mm a");

  return (
    <div className="App">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeHolder="Enter a location (city, country)"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="time">{currentTime}</div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location">
              {weather.name}, {weather.sys.country}
            </div>
            <div className="temperature">{Math.round(weather.main.temp)}°</div>
            <div className="weather-condition">{weather.weather[0].main}</div>
          </div>
        ) : ("")}
      </main>
    </div>
  );
}

export default App;
