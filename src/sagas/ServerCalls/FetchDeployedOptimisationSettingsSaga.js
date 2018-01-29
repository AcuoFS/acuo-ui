import { OPTIMISATION_URL } from '../../constants/APIcalls'

export const FetchDeployedOptimisationSettingsSaga = () =>{
  return(
    fetch(OPTIMISATION_URL)
      .then(response => response.json())
      .then(json => {
        return json
      })
  )
}
