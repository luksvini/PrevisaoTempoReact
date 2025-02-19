// Fetch or Axios
import axios from "axios"
import "dotenv/config"


const URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

 const response = await axios.get(`${URL}/clima`)


