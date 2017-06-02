/**
 * Created by Rui on 2/6/17.
 */
import { FETCH_NAVBAR_ALERTS } from './../constants/APIcalls'

export const FetchNavbarAlerts = () =>
  fetch(FETCH_NAVBAR_ALERTS)
    .then(response =>
      response.json())
    .then(json => json.alerts)
