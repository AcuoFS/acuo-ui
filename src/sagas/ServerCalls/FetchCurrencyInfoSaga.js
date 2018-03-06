/**
 * Created by Rui on 15/11/17.
 */
import axios from 'axios'

import { FETCH_CURRENCY_INFO } from '../../constants/APIcalls'

export const FetchCurrencyInfoSaga = () => (
  axios.get(`${FETCH_CURRENCY_INFO}/${window.localStorage.clientId}`, {withCredentials: false}).then((response) => {
    return response.data
  })
)