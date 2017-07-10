import {
  INIT_DEPARTURES
} from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'
import _ from 'lodash'

import { clearTime } from './../utils'

const INITIAL_STATE = Map({
  departures: List(),
  arrivals: List(),
  arrivals_searchText: "",
  departures_searchText: "",
  departureDatesList: List()
})

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const DeployedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_DEPARTURES:
      return state.withMutations((state) =>
        state
          .set('departures', fromJS(action.departures))
          .set('departureDatesList', fromJS(
              _.reduce(action.departures, (sum, x) => _.unionWith(sum, [{
                "label": (new Date(x.header.time).getDate()) + ' ' + monthNames[(new Date(x.header.time).getMonth())],
                "min": clearTime(new Date(x.header.time)).getTime(),
                "max": clearTime(new Date(x.header.time)).setHours(23, 59, 59, 99)
              }], _.isEqual), []))))
    case "DEPARTURES_SEARCHTEXT":
      return state.set('departures_searchText', fromJS(action.payload))
    case "ARRIVALS_SEARCHTEXT":
      return state.set('arrivals_searchText', fromJS(action.payload))
    default:
      return state
  }
}

export default DeployedReducer
