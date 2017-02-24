import {
  INIT_DISPUTE,
  UPDATE_DISPUTE_FILTER
} from '../constants/ActionTypes'
import {CURRENT_MONTH} from '../constants/DisputeFilters'
import {List, Map, fromJS} from 'immutable'


const initialState = Map({
  disputeData: List(),
  disputeFilter: CURRENT_MONTH
})

const DisputeReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_DISPUTE:
      return state.set('disputeData', fromJS(action.disputeData))
    case UPDATE_DISPUTE_FILTER:
      return state.set('disputeFilter', action.disputeFilter)
    default:
      return state
  }
}

export default DisputeReducer