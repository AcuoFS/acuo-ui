/**
 * Created by Rui on 2/8/17.
 */

import { DASHBOARD_URL } from '../../constants/APIcalls'

export const FetchDashboardSaga = () => (
  fetch(DASHBOARD_URL).then((response) => {
    return response.json()
  }).then((obj) => {
    return obj
  })
)