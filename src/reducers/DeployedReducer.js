import {
  INIT_DEPARTURES,
  UPDATE_SELECTED_DEPARTURE_DATE,
  UPDATE_DEPLOYED_OPTIMISATION_SETTINGS
} from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'
import _ from 'lodash'

import { clearTime } from './../utils'
import * as ActionTypes from "../constants/ActionTypes";

const INITIAL_STATE = Map({
  departures: List(),
  arrivals: List(),
  arrivals_searchText: "",
  departures_searchText: "",
  departureDatesList: List(),
  selectedDepartureDate: Map({'label': ''}),
  optimisation: List(),
})

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const updateOptimisationSettings = (state, settings) => {
  return state.set('optimisation', fromJS(settings))
}

const DeployedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_DEPARTURES:

      return state.withMutations((state) =>
        state
          .set('departures', fromJS(action.departures))
          .set('departureDatesList', fromJS(
              _.reduce(action.departures, (sum, x) => _.unionWith(sum, [{
                "label": (new Date(x.header.time * 1000).getDate()) + ' ' + monthNames[(new Date(x.header.time * 1000).getMonth())],
                "min": clearTime(new Date(x.header.time * 1000)).getTime(),
                "max": clearTime(new Date(x.header.time * 1000)).setHours(23, 59, 59, 99)
              }], _.isEqual), []).sort((a, b) => a.min > b.min))))
    case "DEPARTURES_SEARCHTEXT":
      return state.set('departures_searchText', fromJS(action.payload))
    case "ARRIVALS_SEARCHTEXT":
      return state.set('arrivals_searchText', fromJS(action.payload))
    case UPDATE_SELECTED_DEPARTURE_DATE:
      return state.set('selectedDepartureDate', fromJS(action.date))
    case UPDATE_DEPLOYED_OPTIMISATION_SETTINGS:
      return updateOptimisationSettings(state, action.settings)
    default:
      return state
  }
}

export default DeployedReducer
