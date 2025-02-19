// Fetch or Axios
import axios from "axios"
// import "dotenv/config"

// const { NODE_ENV } = process.env
//  const URL = "http://localhost:5000/api"
const API_URL = import.meta.env.VITE_API_URL;



export const fetchWeather = async (cidade) => {
    return axios.get(`${API_URL}/clima?cidade=${cidade}`);
  };
  
  export const fetchWeather5Days = async (cidade) => {
    return axios.get(`${API_URL}/clima5dias?cidade=${cidade}`);
  };