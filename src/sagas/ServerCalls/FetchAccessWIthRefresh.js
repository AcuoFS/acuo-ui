/***** NOT USED
 * ISSUES WITH RETURNING PROMISE BACK TO THE INTERCEPTOR IN INDEX JS
 */


import axios from "axios/index";
import { FETCH_ACCESS_WITH_REFRESH } from "../../constants/APIcalls";

export const FetchAccessWithRefresh = (config) => (
  axios.get(FETCH_ACCESS_WITH_REFRESH, { withCredentials: true }).then((response) => {
    return new Promise((resolve, reject) => {
      console.log('new token')
      console.log(window.localStorage.getItem('__JWT_TOKEN__'))
      config.headers['Authorization'] = 'Bearer ' + window.localStorage.getItem('__JWT_TOKEN__')
      resolve(axios(config));
      // });
    });
    // return response.data
  })
)