// Import des modules nécessaires
import axios from "axios";

// Url de base de nos requetes vers notre API
const Axios = axios.create({
  baseURL: "http://localhost:4000/api",
});

// intercepteur Axios qui va récupérer nos requêtes et injecter le token dans le header
Axios.interceptors.request.use(request => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.Authorization = 'Bearer '+ token
        }
        return request
})

export default Axios;

