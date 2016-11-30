import * as ActionTypes from '../constants/ActionTypes'
import { Map, fromJS } from 'immutable'

const initOptimisationSettings = (state, settings) => {
  return state.setIn(['pledgeData', 'optimisation'], fromJS(settings.data))
}

const updateOptimisationSettings = (state, newSettings) => {
  return state.setIn(['pledgeData', 'optimisation'], state.getIn(['pledgeData', 'optimisation']).map(x => (x.get('name') == newSettings.name ? fromJS(newSettings) : x)))
}

const PledgeReducer = (state = Map(), action) => {
  switch (action.type) {
    case ActionTypes.INIT_OPTIMISATION_SETTINGS:
      return initOptimisationSettings(state, action.settings)

    case ActionTypes.UPDATE_OPTIMISATION_SETTINGS:
      return updateOptimisationSettings(state, action.newSettings)
  }

  return state
}

export default PledgeReducer