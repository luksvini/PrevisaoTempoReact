import { useState, useRef } from 'react'
import axios from 'axios'
import './App.css'
import WeatherInformations from './components/WeatherInformations/WeatherInformations'
import WeatherInformations5Days from './components/WeatherInformations5Days/WeatherInformations5Days'

function App() {
  const [weather, setWeather] = useState(null)
  const [weather5Days, setWeather5Days] = useState(null)
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef()

  async function searchCity(){
    const city = inputRef.current.value
    if (!city){
      setError("Por favor, digite o nome de uma cidade")
      return
    }

    
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/clima?cidade=${city}`)
      setWeather(response.data)

      const forecastResponse = await axios.get(`http://localhost:5000/api/clima5dias?cidade=${city}`);
      setWeather5Days(forecastResponse.data);
      }catch (error){
        setError("Erro ao buscar dados. Verifique o nome da cidade.");
        console.error(error);

      } finally{
        setLoading(false);
      }

      
 
}



  return (
    <div className='container'>
      <h1>Previsão do tempo</h1>
      <input ref={inputRef}
      type='text'
      placeholder='Digite o nome da cidade'
      />
      <button onClick={searchCity} disabled={loading}>
        {loading ? 'Carregando...' : "Buscar"}
      </button> 

      {error && <p className="error-message">{error}</p>}
      {weather && !loading && <WeatherInformations weather={weather} />}
      {weather5Days && !loading && <WeatherInformations5Days weather5Days={weather5Days} />}
    </div>
  )
}

export default App
