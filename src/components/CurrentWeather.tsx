import React from 'react';
import WeatherIcon from './WeatherIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faWind, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';

interface CurrentWeatherProps {
  temperature: number;
  condition: string;
  location: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  condition,
  location,
  humidity,
  windSpeed,
  pressure,
}) => {
  return (
    <div className="current-weather">
      <h2>{location}</h2>
      <div className="temperature">{Math.round(temperature)}°C</div>
      <WeatherIcon condition={condition} />
      <div className="condition">{condition}</div>
      <div className="additional-info">
        <div><FontAwesomeIcon icon={faTint} /> Humidity: {humidity}%</div>
        <div><FontAwesomeIcon icon={faWind} /> Wind Speed: {windSpeed} m/s</div>
        <div><FontAwesomeIcon icon={faTachometerAlt} /> Pressure: {pressure} hPa</div>
      </div>
    </div>
  );
};

export default CurrentWeather;
