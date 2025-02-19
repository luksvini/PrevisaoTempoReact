// Fetch or Axios
import axios from "axios"
import "dotenv/config"


const URL = import.meta.env.VITE_API_URL || "/api"

 const response = await axios.get(`${URL}/clima`)


