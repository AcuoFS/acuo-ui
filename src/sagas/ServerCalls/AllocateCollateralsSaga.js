/**
 * Created by Rui on 8/8/17.
 */
import axios from 'axios'

import { ALLOCATE_COLLATERALS_URL_NEW } from '../../constants/APIcalls'

export const AllocateCollateralsSaga = (reqObj) =>
  axios.post(ALLOCATE_COLLATERALS_URL_NEW, Object.assign(reqObj, {clientId: window.localStorage.clientId}), {withCredentials: false}).then((response) => {
    return response.data
  })
