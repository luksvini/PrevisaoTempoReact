// Fetch or Axios
import axios from "axios"
// import "dotenv/config"

// const { NODE_ENV } = process.env
 const URL = "http://localhost:5000/api"

//const URL = "https://previsaotemporeact.onrender.com/api"

 const response = await axios.get(`${URL}/clima`)


