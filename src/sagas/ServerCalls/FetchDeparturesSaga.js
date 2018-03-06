/**
 * Created by Rui on 28/7/17.
 */
import axios from 'axios'

import { FETCH_DEPLOYED_DEPARTURES } from '../../constants/APIcalls'

export const FetchDeparturesSaga = () => (
  axios.get(`${FETCH_DEPLOYED_DEPARTURES}/${window.localStorage.clientId}`, {withCredentials: false}).then((response) => {
    return response.data
  })
)