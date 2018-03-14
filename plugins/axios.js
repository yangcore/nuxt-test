import axios from 'axios';

var instance = axios.create({
  baseURL: 'http://www.ychao.club/',
  timeout: 30000
});
export default instance;
