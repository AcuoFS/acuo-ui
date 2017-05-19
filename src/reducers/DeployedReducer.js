import {
  INIT_DEPARTURES
} from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'


const INITIAL_STATE = Map({
  departures: List(),
  arrivals: List(),
  arrivals_searchText: "",
  departures_searchText: ""
})

const DeployedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_DEPARTURES:
      return state.set('departures', fromJS(action.departures))
    case "DEPARTURES_SEARCHTEXT":
      return state.set('departures_searchText', fromJS(action.payload))
    case "ARRIVALS_SEARCHTEXT":
      return state.set('arrivals_searchText', fromJS(action.payload))
    default:
      return state
  }
}

export default DeployedReducer
