import React from 'react';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

interface WeatherAppProps {
  apiKey: string;
  lat: number;
  lon: number;
  currentWeather: {
    temperature: number;
    condition: string;
    location: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
  };
  forecast: {
    time: string;
    temperature: number;
    condition: string;
    day: string;
  }[];
}

const WeatherApp: React.FC<WeatherAppProps> = ({
  currentWeather,
  forecast,
}) => {
  return (
    <div className="weather-app">
      <CurrentWeather {...currentWeather} />
      <Forecast forecast={forecast} />
    </div>
  );
};

export default WeatherApp;
