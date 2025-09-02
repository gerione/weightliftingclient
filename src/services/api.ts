// api.ts file
import axios from 'axios'
const instance = axios.create({
  //baseURL: 'https://weightlifting-overlay.fly.dev/api/',
  baseURL: 'https://api.livestreamserver.sk-voest.com/api/',
  //baseURL: 'http://127.0.0.1:5000/api/',
})
export default instance
