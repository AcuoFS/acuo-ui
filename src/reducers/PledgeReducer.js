import * as ActionTypes from '../constants/ActionTypes'
import { Map, fromJS, List } from 'immutable'


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
  if(selection)
    return state.setIn(['pledgeData', 'selection'], fromJS(selection))
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

const PledgeReducer = (state = Map(), action) => {
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

    case ActionTypes.REMOVE_ASSET_FROM_EARMARK:
      return removeAssetFromEarmark(state, action.asset)

  }

  return state
}

export default PledgeReducer