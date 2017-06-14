import * as ActionTypes from '../constants/ActionTypes'
import { Map, fromJS, List, toJS } from 'immutable'
import _ from 'lodash'

const initFilters = [
  {order: 1, attr: "legalEntity", label: "Legal Entity"},
  {order: 2, attr: "type",        label: "Deriv Type"},
  {order: 3, attr: "notificationTime",        label: "Time Window", type: "time"},
  {order: 4, attr: "direction",   label:  "Direction",  hide: true}
]

const initialState = Map({
  pledgeData: Map({
    optimisation: List(),
    selection: List(),
    collateral: Map(),
    filters: fromJS(initFilters)
  }),
  collateralWidget: Map({ sortBy: "assetName" })
})

const initOptimisationSettings = (state, settings) => {
  return state.setIn(['pledgeData', 'optimisation'], fromJS(settings))
}

const updateOptimisationSettings = (state, newSettings) => {
  return state.setIn(['pledgeData', 'optimisation'], state.getIn(['pledgeData', 'optimisation']).map(x => (x.get('name') == newSettings.name ? fromJS(newSettings) : x)))
}

export const updateCollateral = (state, collateralData) => {
  if(collateralData){
    return state.setIn(['pledgeData', 'collateral'], collateralData)
  }
  else{
    return state
  }
}

export const initSelection = (state, selection) => {
  // console.info(`@PledgeReducer.js, initSelection(arg) where arg = `, selection);
  if(selection){
    return state.setIn(['pledgeData', 'selection'], fromJS(selection))   }
  else
    return state
}

 export const togglePendingAllocation = (state, GUID) => {
  if(!state.getIn(['pledgeData', 'pendingAllocation']) || state.getIn(['pledgeData', 'pendingAllocation']).isEmpty())
    return state.setIn(['pledgeData', 'pendingAllocation'], List().push(GUID))
  else if(state.getIn(['pledgeData', 'pendingAllocation']).includes(GUID))
    return state.setIn(['pledgeData', 'pendingAllocation'], state.getIn(['pledgeData', 'pendingAllocation']).filter(x => x != GUID))
  else
    return state.setIn(['pledgeData', 'pendingAllocation'], state.getIn(['pledgeData', 'pendingAllocation']).push(GUID))
 }

 export const toggleCheckall = (state) => {
  if(state.getIn(['pledgeData', 'pendingAllocation']) && !state.getIn(['pledgeData', 'pendingAllocation']).isEmpty())
    return state.setIn(['pledgeData', 'pendingAllocation'], List())
  else
    return state.setIn(['pledgeData', 'pendingAllocation'], state.getIn(['pledgeData', 'selection']).map(x => x.get('GUID')))
 }

export const removeAssetFromEarmark = (state, removingAsset) => {

  let collateralAssetGroup = state.getIn(['pledgeData', 'collateral', removingAsset.assetType])
  let movingAssetIndex = collateralAssetGroup.findIndex(asset => ((asset.get('assetId') == removingAsset.assetId) && (asset.get('assetIdType') == removingAsset.assetIdType) ) )
  if(movingAssetIndex >= 0){
    let movingAsset = collateralAssetGroup.get(movingAssetIndex)
    let assetCategory = movingAsset.get('assetCategory')
    let stateAfterRemove = state.setIn(['pledgeData', 'collateral', removingAsset.assetType], collateralAssetGroup.remove(movingAssetIndex))
    return stateAfterRemove.setIn(['pledgeData', 'collateral', assetCategory], stateAfterRemove.getIn(['pledgeData', 'collateral', assetCategory]).push(movingAsset))
  }
  else {
    return state;
  }
}

const updateFilters = (filters, newFilter) => (
  _.map(filters, filter => (
    (filter.attr === newFilter.attr)
      ? _.set(filter, 'selected', newFilter.selected)
      : filter
  ))
)

const PledgeReducer = (state = initialState, action) => {
  let filters, newFilter, updatedFilters

  switch (action.type) {
    case ActionTypes.INIT_OPTIMISATION_SETTINGS:
      return initOptimisationSettings(state, action.settings)

    case ActionTypes.UPDATE_OPTIMISATION_SETTINGS:
      return updateOptimisationSettings(state, action.newSettings)

    case ActionTypes.UPDATE_COLLATERAL:
      return updateCollateral(state, action.collateralData)

    case ActionTypes.INIT_SELECTION:
      return initSelection(state, action.selection)

    case ActionTypes.TOGGLE_PENDING_ALLOCATION:
      return togglePendingAllocation(state, action.GUID)

    case ActionTypes.TOGGLE_CHECKALL:
      return toggleCheckall(state)

    case ActionTypes.CLEAR_PENDING_ALLOCATION:
      return state.setIn(['pledgeData', 'pendingAllocation'], List())

    case ActionTypes.REMOVE_ASSET_FROM_EARMARK:
      return removeAssetFromEarmark(state, action.asset)

    case ActionTypes.PLEDGE_FILTER_SET:
      newFilter = action.value
      filters = state.getIn(['pledgeData', 'filters']).toJS()
      updatedFilters = updateFilters(filters, newFilter)
      return state.setIn(['pledgeData', 'filters'], fromJS(updatedFilters))

    case ActionTypes.SELECTION_WIDGET__COLUMN_SORT:
      return state.setIn(['collateralWidget' , 'sortBy'], action.payload)

  }
  return state
}

export default PledgeReducer
