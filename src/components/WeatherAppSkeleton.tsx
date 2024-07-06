import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import '../styles/WeatherApp.css';

const WeatherAppSkeleton: React.FC = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const forecastHours = [2, 5, 8, 11, 14, 17, 20, 23];
  const currentDayForecastCount = forecastHours.filter(hour => hour > currentHour).length;
  const dailyForecastCount = 8;

  const currentDaySkeletons = Array(currentDayForecastCount).fill(0).map((_, index) => (
    <div key={index} className="forecast-day">
      <div className="time"><Skeleton width={60} /></div>
      <div className="icon-container"><Skeleton circle={true} height={40} width={40} /></div>
      <div className="temperature"><Skeleton width={50} /></div>
    </div>
  ));

  const subsequentDaysSkeletons = Array(4).fill(0).map((_, dayIndex) => (
    <div key={dayIndex} className="forecast-day-container">
      <h3><Skeleton width={100} /></h3>
      {Array(dailyForecastCount).fill(0).map((_, cardIndex) => (
        <div key={cardIndex} className="forecast-day">
          <div className="time"><Skeleton width={60} /></div>
          <div className="icon-container"><Skeleton circle={true} height={40} width={40} /></div>
          <div className="temperature"><Skeleton width={50} /></div>
        </div>
      ))}
    </div>
  ));

  return (
    <div className="weather-app">
      <div className="current-weather">
        <h2><Skeleton width={200} /></h2>
        <div className="temperature"><Skeleton width={100} height={80} /></div>
        <span className="weather-icon"><Skeleton circle={true} height={40} width={40} /></span>
        <div className="condition"><Skeleton width={150} /></div>
        <div className="additional-info">
          <div><Skeleton width={100} /></div>
          <div><Skeleton width={100} /></div>
          <div><Skeleton width={100} /></div>
        </div>
      </div>
      <div className="forecast">
        <div className="forecast-day-container">
          <h3><Skeleton width={100} /></h3>
          {currentDaySkeletons}
        </div>
        {subsequentDaysSkeletons}
      </div>
    </div>
  );
};

export default WeatherAppSkeleton;
