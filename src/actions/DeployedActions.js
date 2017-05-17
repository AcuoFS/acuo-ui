import {
  INIT_DEPARTURES
} from '../constants/ActionTypes'

export const initDepartures = (departures) => ({
  type: INIT_DEPARTURES,
  departures
})

export const search = {
 arrivals: (searchText)=>{
  let action = { type: "ARRIVALS_SEARCHTEXT",
                 payload: searchText }
  return action
 }
}
