/**
 * Created by Rui on 8/8/17.
 */
import axios from 'axios'

import { COLLATERAL_URL } from '../../constants/APIcalls'

export const FetchCollateralsSaga = () => (
  axios.get(`${COLLATERAL_URL}/${window.localStorage.clientId}`).then((response) => {
    return response.data
  })
)