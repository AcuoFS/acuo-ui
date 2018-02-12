/**
 * Created by Rui on 2/6/17.
 */
import axios from 'axios'

import { FETCH_NAVBAR_ALERTS } from '../../constants/APIcalls'

export const FetchNavbarAlerts = () =>
    axios.get(`${FETCH_NAVBAR_ALERTS}/${window.localStorage.clientId}`)
     .then( response => response.data )


