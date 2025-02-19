import React, { useState, useEffect } from 'react'
import './WeatherInformations5Days.css'



const WeatherInformations5Days = ({weather5Days}) => {
  if (!weather5Days || !weather5Days.list) return <p>Carregando previsão...</p>;
  let dailyForecast = {}
  
  for(let forecast of weather5Days.list){
    const date = new Date(forecast.dt * 1000).toLocaleDateString()

    if(!dailyForecast[date]){
      dailyForecast[date] = forecast
    }
  }

  const next5Days = Object.values(dailyForecast).slice(0,5)
 

  const next5DaysForecast = next5Days
    

  function convertDate(date){
    const newDate = new Date(date.dt * 1000).toLocaleDateString('pt-BR',{weekday: 'long', day: "2-digit"})

    return newDate;
  }
    
  return (
    <section className='weather-container'>
        <h3>Previsão próximos 5 dias</h3>
        
        <div className='weather-list'> 
        {next5DaysForecast.map(forecast =>(
          <div key={forecast.dt} className='weather-items'>
            <p className='forecast-day'>{convertDate(forecast)}</p>
            <img  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}/>
            <p>{forecast.weather[0].description}</p>
            <p>{Math.round(forecast.main.temp_min)}ºC min / {Math.round(forecast.main.temp_max)}ºC máx</p>
          </div>
        ))}
        </div>
    </section>
  )
}

export default WeatherInformations5Days