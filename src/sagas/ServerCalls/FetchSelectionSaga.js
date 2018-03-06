/**
 * Created by Rui on 7/8/17.
 */
import axios from 'axios'

import { MARGIN_SELECTION_URL } from '../../constants/APIcalls'

export const FetchSelectionSaga = () => (
  axios.get(`${MARGIN_SELECTION_URL}/${window.localStorage.clientId}`, {withCredentials: false}).then((response) => {
    return response.data
  })
)