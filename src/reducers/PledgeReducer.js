import * as ActionTypes from '../constants/ActionTypes'
import { Map, fromJS, List } from 'immutable'

const INITIAL_STATE = Map({
  'pledgeData': Map({
    'optimisation': List(),
    'selection': List(),
    'collateral': List()
  })
})

const initOptimisationSettings = (state, settings) => {
  return state.setIn(['pledgeData', 'optimisation'], fromJS(settings.data))
}

const updateOptimisationSettings = (state, newSettings) => {
  return state.setIn(['pledgeData', 'optimisation'], state.getIn(['pledgeData', 'optimisation']).map(x => (x.get('name') == newSettings.name ? fromJS(newSettings) : x)))
}

export const updateCollateral = (state, action) => {
  if(action.collateralData){
    return state.setIn(['pledgeData', 'collateral'], action.collateralData)
  }
  else{
    return state
  }
}

export const initSelection = (state, selection) => {
  if(selection.data.inMarginCall)
    return state.setIn(['pledgeData', 'selection'], fromJS(selection.data.inMarginCall))
  else
    return state
}

const PledgeReducer = (state = Map(), action) => {
  switch (action.type) {
    case ActionTypes.INIT_OPTIMISATION_SETTINGS:
      return initOptimisationSettings(state, action.settings)

    case ActionTypes.UPDATE_OPTIMISATION_SETTINGS:
      return updateOptimisationSettings(state, action.newSettings)

    case ActionTypes.UPDATE_COLLATERAL:
      return updateCollateral(state, action)

    case ActionTypes.INIT_SELECTION:
      return initSelection(state, action.selection)
  }

  return state
}

export default PledgeReducer