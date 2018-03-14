import axios from 'axios';

var instance = axios.create({
  baseURL: '/',
  timeout: 30000
});
export default instance;
