/**
 * Created by Rui on 8/8/17.
 */

import { ALLOCATE_COLLATERALS_URL_NEW } from '../../constants/APIcalls'

export const AllocateCollateralsSaga = (reqObj) =>
  fetch(ALLOCATE_COLLATERALS_URL_NEW,{
      method: 'POST',
      body: JSON.stringify(Object.assign(reqObj, {clientId: window.localStorage.clientID}))
    }).then((response) => {
    return response.json()
  }).then((obj) => {
    // console.log(obj)
    return obj
  })
