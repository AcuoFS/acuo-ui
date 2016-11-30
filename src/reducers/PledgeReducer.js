import * as ActionTypes from '../constants/ActionTypes'
import { Map, fromJS } from 'immutable'

const initOptimisationSettings = (state, settings) => {
  return state.setIn(['pledgeData', 'optimisation'], fromJS(settings.data))
}

const PledgeReducer = (state = Map(), action) => {
  switch (action.type) {
    case ActionTypes.INIT_OPTIMISATION_SETTINGS:
      return initOptimisationSettings(state, action.settings)
  }

  return state
}

export default PledgeReducer