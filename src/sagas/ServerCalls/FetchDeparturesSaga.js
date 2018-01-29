/**
 * Created by Rui on 28/7/17.
 */

import { FETCH_DEPLOYED_DEPARTURES } from '../../constants/APIcalls'

export const FetchDeparturesSaga = () => (
  fetch(`${FETCH_DEPLOYED_DEPARTURES}/${window.localStorage.clientId}`).then((response) => {
    return response.json()
  }).then((obj) => {
    return obj
  })
)