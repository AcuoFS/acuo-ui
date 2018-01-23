/**
 * Created by Rui on 8/8/17.
 */

import { COLLATERAL_URL } from '../../constants/APIcalls'

export const FetchCollateralsSaga = () => (
  fetch(`${COLLATERAL_URL}/${window.localStorage.clientId}`).then((response) => {
    return response.json()
  }).then((obj) => {
    return obj
  })
)