/**
 * Created by Rui on 4/8/17.
 */
import axios from 'axios'

import { OPTIMISATION_URL } from '../../constants/APIcalls'

export const FetchOptimisationSettingsSaga = () =>
    axios.get(`${OPTIMISATION_URL}/${window.localStorage.clientId}`)
      .then(response => response.data)

