/**
 * Created by Rui on 4/8/17.
 */

import { OPTIMISATION_URL } from '../../constants/APIcalls'

export const FetchOptimisationSettingsSaga = () =>{
  return(
    fetch(`${OPTIMISATION_URL}/${window.localStorage.clientID}`)
      .then(response => response.json())
      .then(json => {
        return json
      })
  )
}
