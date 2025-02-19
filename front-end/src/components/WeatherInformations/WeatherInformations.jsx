import React, { useState, useEffect, sys } from 'react'
import { getName }  from 'country-list'
import countries from 'i18n-iso-countries'
import pt from 'i18n-iso-countries/langs/pt.json';
import './WeatherInformations.css'

countries.registerLocale(pt);





const WeatherInformations = ({weather}) => {
    if(!weather) return <p>Carregando dados...</p>

    
    const {name, sys, dt, timezone, main, weather: weatherDetails} = weather;
    const {temp, feels_like, humidity, pressure} = main;
    const {icon, description} = weatherDetails?.[0] || {}
    

    const countryCode = sys?.country || "País não disponivel"

   

    const countryName = countries.getName(countryCode, "pt") || "País não disponível";
    
    const [localTime, setLocalTime] = useState("")


    const updateLocalTime = () => {
        if (!dt || timezone === undefined) return "Horário não disponível";
    
        const now = Math.floor(Date.now() / 1000); // Timestamp atual em segundos
        const elapsed = now - dt; // Tempo decorrido desde a API
        const currentLocalTime = new Date((dt + elapsed + timezone) * 1000);
    
        setLocalTime(
            currentLocalTime.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              timeZone: "UTC",
            })
          );
    
          
    }
    useEffect(() => {
        updateLocalTime(); // Atualiza ao carregar
        const interval = setInterval(updateLocalTime, 1000);
        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
      }, [dt, timezone]);

  return (
    <section className='weather-container'>
        <h2>{name || "Cidade não encontrada"}, {countryName}</h2>
        

        <article className='weather-info'>
        {icon && (
          <img
            src={`http://openweathermap.org/img/wn/${icon}.png`}
            alt="Ícone do clima"
          />
        )}
        <p className='temperature'>{Math.round(temp)}ºC</p>
      </article>

         <p className='description'>{description || "Sem descrição disponível"}</p>

        <div className='details'>
        <p><strong>Sensação térmica:</strong> {feels_like ? Math.round(feels_like) : "Dados não disponíveis"}ºC</p>
        <p><strong>Umidade:</strong> {humidity ? `${humidity}` : "Dados não disponíveis"}%</p>
        <p><strong>Pressão:</strong> {pressure ? pressure : "Dados não disponíveis"} hPa</p>
        <p><strong>Hora local:</strong> {localTime ? localTime : "Dados não disponíveis"}</p>
        
      </div>
    </section>
  )
}

export default WeatherInformations