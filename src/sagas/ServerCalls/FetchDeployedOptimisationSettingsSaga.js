import axios from 'axios'

import { OPTIMISATION_URL } from '../../constants/APIcalls'

export const FetchDeployedOptimisationSettingsSaga = () =>
    axios.get(`${OPTIMISATION_URL}/${window.localStorage.clientId}`, {withCredentials: false})
      .then(response => response.data)


