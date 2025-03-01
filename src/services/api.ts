// api.ts file
import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://weightlifting-overlay.fly.dev/api/',
});
export default instance;
