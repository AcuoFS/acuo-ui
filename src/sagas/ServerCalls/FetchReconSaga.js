/**
 * Created by Rui on 3/8/17.
 */

import { RECON_URL } from '../../constants/APIcalls'

export const FetchReconSaga = () => (
  fetch(`${RECON_URL}/${window.localStorage.clientID}`).then((response) => {
    return response.json()
  }).then((obj) => {
    return obj
  })
)