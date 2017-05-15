import {
  INIT_DEPARTURES
} from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'


const initialState = Map({
  departures: List(),
  arrivals: List()
})

const DeployedReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DEPARTURES:
      return state.set('departures', fromJS(action.departures))
    default:
      return state
  }
}

export default DeployedReducer