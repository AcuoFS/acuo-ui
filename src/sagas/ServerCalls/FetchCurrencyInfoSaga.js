/**
 * Created by Rui on 15/11/17.
 */

import { FETCH_CURRENCY_INFO } from '../../constants/APIcalls'

export const FetchCurrencyInfoSaga = () => (
  fetch(`${FETCH_CURRENCY_INFO}/${window.localStorage.clientID}`).then((response) => {
    return response.json()
  }).then((obj) => {
    return obj
  })
)