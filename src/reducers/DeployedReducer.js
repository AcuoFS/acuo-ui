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
  departures_searchText: ""
})

const DeployedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_DEPARTURES:
      return state.withMutations((state) =>
        state
          .set('departures', fromJS(action.departures))
          .set('departureDatesList', fromJS(
              _.reduce(action.departures, (sum, x) => {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                return _.union(sum, [
                  (new Date(x.header.time).getDate()) + ' ' + monthNames[(new Date(x.header.time).getMonth())]
                ])
              }, []))))
    case "DEPARTURES_SEARCHTEXT":
      return state.set('departures_searchText', fromJS(action.payload))
    case "ARRIVALS_SEARCHTEXT":
      return state.set('arrivals_searchText', fromJS(action.payload))
    default:
      return state
  }
}

export default DeployedReducer
