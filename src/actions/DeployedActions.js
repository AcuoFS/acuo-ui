import {
  INIT_DEPARTURES
} from '../constants/ActionTypes'

export const initDepartures = (departures) => ({
  type: INIT_DEPARTURES,
  departures
})

export const search = {
 arrivals: (searchText)=> ({ type: "ARRIVALS_SEARCHTEXT", payload: searchText }) ,
 departures: (searchText)=>({ type: "DEPARTURES_SEARCHTEXT", payload: searchText })
}
