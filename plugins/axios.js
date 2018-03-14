import axios from 'axios';

var instance = axios.create({
  baseURL: 'http://127.0.0.1:3030/',
  timeout: 10000
});
export default instance;
