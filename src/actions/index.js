import * as ActionTypes from '../constants/ActionTypes'


export const initState = (state) => ({
  type: ActionTypes.INIT_STATE,
  state: state
})

export const reconInitState = (items) => ({
  type: ActionTypes.RECON_INIT_STATE,
  items,
})

export const filterStateDeriv = (derivType) => ({
  type: ActionTypes.FILTER_STATE_DERIV,
  filter: derivType
})

export const filterStateLegal = (legalEntity) => ({
  type: ActionTypes.FILTER_STATE_LEGAL,
  filter: legalEntity
})

export const filterTimeWindowStatus = (timeWindowMin, timeWindowMax, timeRangeText) => ({
  type: ActionTypes.FILTER_STATE_TIMEWINDOW,
  minTime: timeWindowMin,
  maxTime: timeWindowMax,
  timeRangeText: timeRangeText
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

export const updateCollateral = (collateralData) => ({
  type: ActionTypes.UPDATE_COLLATERAL,
  collateralData: collateralData
})


export const selectedItems = (GUID, id) => ({
  type: ActionTypes.SELECT_ITEM,
  GUID: GUID,
  id: id
})

export const reconItem = (id) => ({
  type: ActionTypes.RECON_ITEM,
  GUID: id
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

export const removeAssetFromEarmark = (e, assetType, assetId, assetIdType) => ({
  type: ActionTypes.REMOVE_ASSET_FROM_EARMARK,
  asset : {
    assetType : assetType,
    assetId : assetId,
    assetIdType : assetIdType
  }
})

//recon
export const firstLeveSelect = (GUID, firstLevelID) => ({
  type: ActionTypes.FIRSTLEVEL_SELECT,
  GUID: GUID,
  firstLevelID: firstLevelID
})

export const secondLevelSelect = (GUID, parentID, secondLevelID) => ({
  type: ActionTypes.SECONDLEVEL_SELECT,
  GUID: GUID,
  parentID: parentID,
  secondLevelID: secondLevelID
})