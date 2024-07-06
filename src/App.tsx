import React, { useEffect, useState } from 'react';
import './styles/WeatherApp.css';
import WeatherApp from './components/WeatherApp';
import WeatherAppSkeleton from './components/WeatherAppSkeleton';

const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your API key

const App: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState({
    location: '',
    temperature: 0,
    condition: '',
    humidity: 0,
    windSpeed: 0,
    pressure: 0,
  });
  const [forecast, setForecast] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (latitude: number, longitude: number) => {
    try {
      setLoading(true);
      // Fetch current weather data
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const currentData = await currentResponse.json();

      const current = {
        location: currentData.name,
        temperature: currentData.main.temp,
        condition: currentData.weather[0].main,
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed,
        pressure: currentData.main.pressure,
      };

      setCurrentWeather(current);
      updateBackground(current.condition);

      // Fetch 5 day / 3 hour forecast data
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      const forecast = forecastData.list.map((timestamp: any) => ({
        time: new Date(timestamp.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
        temperature: timestamp.main.temp,
        condition: timestamp.weather[0].main,
        day: new Date(timestamp.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
      }));

      setForecast(forecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Weather App";

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          fetchWeatherData(position.coords.latitude, position.coords.longitude);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const updateBackground = (condition: string) => {
    const gradients: { [key: string]: string } = {
      Clear: 'linear-gradient(135deg, #FFEE93 0%, #FFDD00 100%)',
      Clouds: 'linear-gradient(135deg, #D3D3D3 0%, #A9A9A9 100%)',
      Rain: 'linear-gradient(135deg, #A4B0BD 0%, #64778D 100%)',
      Snow: 'linear-gradient(135deg, #E0F7FA 0%, #B2EBF2 100%)',
      Drizzle: 'linear-gradient(135deg, #B4C9E0 0%, #8FA8C3 100%)',
      Thunderstorm: 'linear-gradient(135deg, #616161 0%, #212121 100%)',
      Mist: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
      Smoke: 'linear-gradient(135deg, #9E9E9E 0%, #757575 100%)',
      Haze: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
      Dust: 'linear-gradient(135deg, #F5F5DC 0%, #D2B48C 100%)',
      Fog: 'linear-gradient(135deg, #E0E0E0 0%, #BDBDBD 100%)',
      Sand: 'linear-gradient(135deg, #F5F5DC 0%, #D2B48C 100%)',
      Ash: 'linear-gradient(135deg, #BDBDBD 0%, #616161 100%)',
      Squall: 'linear-gradient(135deg, #B4C9E0 0%, #8FA8C3 100%)',
      Tornado: 'linear-gradient(135deg, #757575 0%, #424242 100%)',
    };

    document.body.style.setProperty('--background-gradient', gradients[condition] || '#e0e0e0');
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length > 0) {
        const { lat, lon } = geoData[0];
        fetchWeatherData(lat, lon);
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error("Error fetching geolocation data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a location"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <WeatherAppSkeleton />
      ) : (
        <WeatherApp
          apiKey={API_KEY}
          lat={0}
          lon={0}
          currentWeather={currentWeather}
          forecast={forecast}
        />
      )}
    </div>
  );
};

export default App;
