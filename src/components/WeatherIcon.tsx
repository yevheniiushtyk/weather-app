import React from 'react';

interface WeatherIconProps {
  condition: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition }) => {
  const iconMap: { [key: string]: string } = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Snow: '❄️',
    Drizzle: '🌦️',
    Thunderstorm: '⛈️',
    Mist: '🌫️',
    Smoke: '💨',
    Haze: '🌫️',
    Dust: '🌪️',
    Fog: '🌫️',
    Sand: '🌪️',
    Ash: '🌋',
    Squall: '🌬️',
    Tornado: '🌪️'
  };

  return (
    <span className="weather-icon">{iconMap[condition] || '❓'}</span>
  );
};

export default WeatherIcon;
