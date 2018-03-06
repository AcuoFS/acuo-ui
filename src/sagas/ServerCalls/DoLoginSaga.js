/**
 * Created by Rui on 11/8/17.
 */
import axios from 'axios'

import { LOGIN_URL } from '../../constants/APIcalls'

export const DoLoginSaga = (user, pass) => (
  axios.post(LOGIN_URL, {
    user,
    pass
  }, {
    withCredentials: false,
    headers: {'content-type': 'application/json'},
  }).then(response => {
    // console.log(response)
    return response.data
  }).catch(err => false)
)