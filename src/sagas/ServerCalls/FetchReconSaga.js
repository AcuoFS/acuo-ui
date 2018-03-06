/**
 * Created by Rui on 3/8/17.
 */
import axios from 'axios'

import { RECON_URL } from '../../constants/APIcalls'

export const FetchReconSaga = () => (
  axios.get(`${RECON_URL}/${window.localStorage.clientId}`, {withCredentials: false}).then((response) => {
    return response.data
  })
)