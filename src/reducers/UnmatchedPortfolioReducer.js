import {
  INIT_UNMATCHED_PORTFOLIO
} from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'

const initialState = Map({
  unmatchedPortfolios: List()
})

const UnmatchedPortfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_UNMATCHED_PORTFOLIO:
      return state.set('unmatchedPortfolios', fromJS(action.unmatchedPortfolios))
    default:
      return state
  }
}

export default UnmatchedPortfolioReducer