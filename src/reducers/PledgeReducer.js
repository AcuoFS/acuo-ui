import * as ActionTypes from '../constants/ActionTypes'
import { Map, fromJS } from 'immutable'

const initOptimisationSettings = (state, settings) => {
  console.log(settings)
  return state.set('optimisation', fromJS(settings))
}

const PledgeReducer = (state = Map(), action) => {
  switch (action.type) {
    case ActionTypes.INIT_OPTIMISATION_SETTINGS:
      return initOptimisationSettings(state, action.settings)
  }

  return state
}

export default PledgeReducer