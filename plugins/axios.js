import axios from 'axios';

console.info(process.env.NODE_ENV)
let baseURL;
if (process.env.NODE_ENV === "development") {
  baseURL = 'http://127.0.0.1:3030/'
} else if (process.env.NODE_ENV === "production") {
  baseURL = 'http://111.231.89.222:3030/';
}
var instance = axios.create({
  baseURL: baseURL,
  timeout: 30000
});
export default instance;
