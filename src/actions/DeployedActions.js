import {
  INIT_DEPARTURES
} from '../constants/ActionTypes'

export const initDepartures = (departures) => ({
  type: INIT_DEPARTURES,
  departures
})