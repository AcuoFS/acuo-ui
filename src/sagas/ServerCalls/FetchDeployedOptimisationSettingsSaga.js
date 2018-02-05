import { OPTIMISATION_URL } from '../../constants/APIcalls'

export const FetchDeployedOptimisationSettingsSaga = () =>{
  return(
    fetch(`${OPTIMISATION_URL}/${window.localStorage.clientId}`)
      .then(response => response.json())
      .then(json => {
        return json
      })
  )
}
