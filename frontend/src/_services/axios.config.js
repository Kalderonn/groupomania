// Import des modules nécessaires
import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default Axios;
