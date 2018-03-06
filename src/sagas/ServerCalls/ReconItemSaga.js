/**
 * Created by Rui on 27/7/17.
 */
import axios from 'axios'

import { RECON_DATA_URL, RECON_URL } from '../../constants/APIcalls'

export const ReconItemSaga = (params) => {
  return axios.post(RECON_DATA_URL, {params, clientId: window.localStorage.clientId}, {withCredentials: false}).then(response => {
    // console.log('response ' + JSON.stringify(response))
    // console.log(response)
    return axios.get(`${RECON_URL}/${window.localStorage.clientId}`).then((response) => {
      // console.log(response)
      return response.data
    })
  })
  // console.log(result)
  // return result
}
