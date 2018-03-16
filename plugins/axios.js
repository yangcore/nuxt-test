import axios from 'axios';

var instance = axios.create({
  baseURL: 'http://127.0.0.1:3030/',
  timeout: 30000
});
export default instance;
