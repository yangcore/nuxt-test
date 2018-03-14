import axios from '~/plugins/axios.js';

export default function ({req}) {
  if (process.server && req.headers.cookie) {
    axios.defaults.headers.common.cookie = req.headers.cookie
  }
}
