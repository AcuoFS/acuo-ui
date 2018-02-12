import axios from 'axios'

import { LOGOUT_URL } from '../../constants/APIcalls'

export const DoLogoutSaga = () => (
  axios.post(LOGOUT_URL, {
    clientId: window.localStorage.getItem('clientId')
  }, {
    headers: {'content-type': 'application/json'},
  }).then(response => {
    // console.log(response)
    return response.data
  }).catch(err => false)
)