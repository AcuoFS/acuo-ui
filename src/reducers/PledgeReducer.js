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

export const togglePendingAllocation = (state, GUID) => {
  if(!state.getIn(['pledgeData', 'pendingAllocation']) || state.getIn(['pledgeData', 'pendingAllocation']).isEmpty())
    return state.setIn(['pledgeData', 'pendingAllocation'], List().push(parseInt(GUID)))
  else if(state.getIn(['pledgeData', 'pendingAllocation']).includes(parseInt(GUID)))
    return state.setIn(['pledgeData', 'pendingAllocation'], state.getIn(['pledgeData', 'pendingAllocation']).filter(x => x != GUID))
  else
    return state.setIn(['pledgeData', 'pendingAllocation'], state.getIn(['pledgeData', 'pendingAllocation']).push(parseInt(GUID)))
}

export const toggleCheckall = (state) => {
  if(state.getIn(['pledgeData', 'pendingAllocation']) && !state.getIn(['pledgeData', 'pendingAllocation']).isEmpty())
    return state.setIn(['pledgeData', 'pendingAllocation'], List())
  else
    return state.setIn(['pledgeData', 'pendingAllocation'], state.getIn(['pledgeData', 'selection']).map(x => x.get('GUID')))
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

    case ActionTypes.TOGGLE_PENDING_ALLOCATION:
      return togglePendingAllocation(state, action.GUID)

    case ActionTypes.TOGGLE_CHECKALL:
      return toggleCheckall(state)
  }

  return state
}

export default PledgeReducer