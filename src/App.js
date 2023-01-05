import React, { useState } from "react";

const api = {
  key: "847fe7f05d4f2e00e711ba4f61157d24",
  url: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <div className="App">
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeHolder="Enter a location (e.g. Tokyo, JP)"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {typeof weather.main != "undefined" ? (
            <div className="results">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="temperature">
                <div className="actual-temp">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="feels-like-temp">
                  Feels like: {Math.round(weather.main.feels_like)}°C
                </div>
              </div>
              <div className="weather-condition">{weather.weather[0].main}</div>
              <div className="weather-description">{weather.weather[0].description}</div>
              <img className="weather-icon" src={`icons/${weather.weather[0].main}.png`}></img>
              <div className="minor-info">
                <div className="humidity">
                  <div>Humidity</div> <div>{weather.main.humidity}%</div>
                </div>
                <div className="pressure">
                  <div>Pressure</div> <div>{weather.main.pressure} hPa</div>
                </div>
                <div className="visibility">
                  <div>Visibility</div> <div>{weather.visibility/1000} km</div>
                </div>
                <div className="wind">
                  <div>Wind</div> <div>{Math.round(weather.wind.speed)} m/s</div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </main>
    </div>
  );
}

export default App;
