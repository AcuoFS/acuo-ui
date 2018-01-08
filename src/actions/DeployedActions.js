import {
  INIT_DEPARTURES,
  UPDATE_SELECTED_DEPARTURE_DATE,
  FETCH_DEPARTURES,
  UPDATE_DEPLOYED_OPTIMISATION_SETTINGS,
  ON_INIT_DEPLOYED_OPTIMISATION_SETTINGS
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

export const updateDeployedOptimisationSettings = (settings) => ({
  type: UPDATE_DEPLOYED_OPTIMISATION_SETTINGS,
  settings
})

export const fetchDeployedOptimisationSettings = () => ({
  type: ON_INIT_DEPLOYED_OPTIMISATION_SETTINGS
})