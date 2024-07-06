import React from 'react';
import WeatherIcon from './WeatherIcon';

interface ForecastTimestamp {
  time: string;
  temperature: number;
  condition: string;
  day: string;
}

interface ForecastProps {
  forecast: ForecastTimestamp[];
}

const groupForecastByDay = (forecast: ForecastTimestamp[]) => {
  return forecast.reduce((acc: { [key: string]: ForecastTimestamp[] }, timestamp) => {
    if (!acc[timestamp.day]) {
      acc[timestamp.day] = [];
    }
    acc[timestamp.day].push(timestamp);
    return acc;
  }, {});
};

const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  const groupedForecast = groupForecastByDay(forecast);
  
  return (
    <div className="forecast">
      {Object.entries(groupedForecast).map(([day, timestamps], index) => (
        <div key={index} className="forecast-day-container">
          <h3>{day}</h3>
          {timestamps.map((timestamp, idx) => (
            <div key={idx} className="forecast-day">
              <div className="time">{timestamp.time}</div>
              <div className="icon-container">
                <WeatherIcon condition={timestamp.condition} />
              </div>
              <div className="temperature">
                {Math.round(timestamp.temperature)}°C
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Forecast;
