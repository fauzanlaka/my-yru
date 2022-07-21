import axios from 'axios';
// let token = localStorage.getItem('token')
const authService = axios.create({
    baseURL: process.env.VUE_APP_URL_API,
    withCredentials: true,
    headers: {
      "Content-type": "multipart/form-data",
      "Accept": "application/json",
      // "Authorization": `Bearer ${getCookie('jwt')}`
  }
})

export default authService;