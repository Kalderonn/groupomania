// Import des modules nécessaires
import axios from "axios";

// Url de base de nos requetes vers notre API
const Axios = axios.create({
  baseURL: "http://localhost:4000/api",
});

// intercepteur Axios qui va récupérer nos requêtes et injecter le token dans le header
Axios.interceptors.request.use(request => {
  if (localStorage.length !== 0){
        const token = localStorage.getItem("token");
        // const token = user.token;
        console.log(typeof token)
        console.log(token)
        console.log(request)
        if (token) {
          request.headers.Authorization = 'Bearer '+ token
          console.log(request)
          console.log(typeof request.headers.Authorization)
    
        }
        return request
      }
      return request
//   if (localStorage.length !== 0){
//     const user = JSON.parse(localStorage.getItem("user"));
//     const token = user.token;
//     console.log(typeof token)
//     console.log(token)
//     console.log(request)
//     if (token) {
//       request.headers.Authorization = 'Bearer '+ token
//       console.log(request)
//       console.log(typeof request.headers.Authorization)

//     }
//     return request
//     console.log(typeof request.headers.Authorization)
//   }

//   return request
})

export default Axios;

