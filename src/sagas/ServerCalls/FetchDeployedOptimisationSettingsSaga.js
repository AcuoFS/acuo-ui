import { OPTIMISATION_URL } from '../../constants/APIcalls'

export const FetchDeployedOptimisationSettingsSaga = () =>{
  return(
    fetch(`${OPTIMISATION_URL}/${window.localStorage.clientID}`)
      .then(response => response.json())
      .then(json => {
        return json
      })
  )
}
