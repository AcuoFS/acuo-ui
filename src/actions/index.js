import * as ActionTypes from '../constants/ActionTypes'


export const initState = (state) => ({
  type: ActionTypes.INIT_STATE,
  state: state
})

export const filterStateDeriv = (derivType) => ({
  type: ActionTypes.FILTER_STATE_DERIV,
  filter: derivType
})

export const filterStateLegal = (legalEntity) => ({
  type: ActionTypes.FILTER_STATE_LEGAL,
  filter: legalEntity
})

export const filterTimeWindowStatus = (timeWindowMin, timeWindowMax) => ({
  type: ActionTypes.FILTER_STATE_TIMEWINDOW,
  minTime: timeWindowMin,
  maxTime: timeWindowMax
})

export const filterStateStatus = (status) => ({
  type: ActionTypes.FILTER_STATE_STATUS,
  filter: status
})

export const filterCptyOrg = (cptyOrg) => ({
  type: ActionTypes.FILTER_STATE_CPTYORG,
  filter: cptyOrg
})

export const filterCptyEntity = (cptyEntity) => ({
  type: ActionTypes.FILTER_STATE_CPTYENTITY,
  filter: cptyEntity
})

export const lineItemInsertion = (lineItem) => ({
  type: ActionTypes.LINE_ITEM_INSERTION,
  addition: lineItem
})

export const updateCollateral = (collateralData) => ({
  type: ActionTypes.UPDATE_COLLATERAL,
  collateralData: collateralData
})


export const selectedItems = (id, item) => ({
  type: ActionTypes.SELECT_ITEM,
  GUID: id,
  name: item
})

export const reconItem = () => ({
  type: ActionTypes.RECON_ITEM
})

//pledgeReducer stuffs, to be split later
export const initOptimisationSettings = (settings) => ({
  type: ActionTypes.INIT_OPTIMISATION_SETTINGS,
  settings: settings
})

export const updateOptimisationSettings = (newSettings) => ({
  type: ActionTypes.UPDATE_OPTIMISATION_SETTINGS,
  newSettings: newSettings
})

export const initSelection = (selection) => ({
  type: ActionTypes.INIT_SELECTION,
  selection: selection
})

export const togglePendingAllocation = (GUID) => ({
  type: ActionTypes.TOGGLE_PENDING_ALLOCATION,
  GUID: GUID
})

export const toggleCheckall = () => ({
  type: ActionTypes.TOGGLE_CHECKALL
})