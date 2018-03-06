/**
 * Created by Rui on 2/8/17.
 */
import axios from'axios'

import { DASHBOARD_URL } from '../../constants/APIcalls'

export const FetchDashboardSaga = () => (
  axios.get(`${DASHBOARD_URL}/${window.localStorage.clientId}`, {withCredentials: false}).then((response) => {
    // console.log(response.data)
    return response.data
  })
)