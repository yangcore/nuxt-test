import axios from 'axios';

var instance = axios.create({
  baseURL: 'http://111.231.89.222:3030/',
  timeout: 30000
});
export default instance;
