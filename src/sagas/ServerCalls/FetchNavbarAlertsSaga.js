/**
 * Created by Rui on 2/6/17.
 */
import { FETCH_NAVBAR_ALERTS } from '../../constants/APIcalls'

export const FetchNavbarAlerts = () =>{
   return(
    fetch(`${FETCH_NAVBAR_ALERTS}/${window.localStorage.clientID}`)
     .then( response=>response.json() )
     .then(json => {
      return json.alerts
     })
   )
 }
