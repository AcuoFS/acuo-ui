import {
  INIT_DEPARTURES,
  UPDATE_SELECTED_DEPARTURE_DATE,
  FETCH_DEPARTURES
} from '../constants/ActionTypes'

export const initDepartures = (departures) => ({
  type: INIT_DEPARTURES,
  departures
})

export const search = {
 arrivals: (searchText)=> ({ type: "ARRIVALS_SEARCHTEXT", payload: searchText }) ,
 departures: (searchText)=>({ type: "DEPARTURES_SEARCHTEXT", payload: searchText })
}

export const updateSelectedDepartureDate = date => ({
  type: UPDATE_SELECTED_DEPARTURE_DATE,
  date
})

export const fetchDepartures = () => ({
  type: FETCH_DEPARTURES
})