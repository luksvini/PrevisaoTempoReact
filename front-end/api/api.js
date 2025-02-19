// Fetch or Axios
import axios from "axios"
import "dotenv/config"

const {NODE_ENV} = process.env;
const URL = NODE_ENV === 'development' ? "http://localhost:5000/api" : "/api"

 const response = await axios.get(`${URL}/clima`)


