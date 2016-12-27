import { connect } from 'react-redux'
import { PledgeComponent } from '../components'
import {
  initOptimisationSettings,
  updateOptimisationSettings,
  initSelection,
  togglePendingAllocation,
  toggleCheckall,
  updateCollateral,
  removeAssetFromEarmark } from '../actions'
import { List, fromJS } from 'immutable'

import { ALLOCATE_COLLATERALS_URL } from '../constants/APIcalls'

const determineCheckboxStatus = (selectionSize, pendingAllocationSize) => {
  if(pendingAllocationSize >= selectionSize)
    return ["./images/pledge/checkboxwithtick.png", "All"]
  else if(pendingAllocationSize == 0 && selectionSize != 0)
    return ["./images/pledge/checkbox.png", "None"]
  else
    return ["./images/common/minusbox.png", "Selected"]
}

const checkIfExist = (something) => something || List()

const mapStateToProps = state => ({
  collateral : state.PledgeReducer.getIn(['pledgeData', 'collateral']),
  optimisation: state.PledgeReducer.getIn(['pledgeData', 'optimisation']),
  selection: state.PledgeReducer.getIn(['pledgeData', 'selection']),
  pendingAllocation: state.PledgeReducer.getIn(['pledgeData', 'pendingAllocation']),
  sliderCheckbox: determineCheckboxStatus(checkIfExist(state.PledgeReducer.getIn(['pledgeData', 'selection'])).size, checkIfExist(state.PledgeReducer.getIn(['pledgeData', 'pendingAllocation'])).size )
})

const mapDispatchToProps = dispatch => ({
  onInitOptimisationSettings: (settings) => {
    dispatch(initOptimisationSettings(settings))
  },
  onUpdateOptimisationSettings: (newSettings) => {
    dispatch(updateOptimisationSettings(newSettings))
  },
  initSelection: (selection) => {
    dispatch(initSelection(selection.data.inMarginCall))
  },
  onTogglePendingAllocation: (GUID) => {
    dispatch(togglePendingAllocation(GUID))
  },
  onToggleCheckall: () => {
    dispatch(toggleCheckall())
  },
  onAllocate: (e) => {
    fetch(ALLOCATE_COLLATERALS_URL, {
      method: 'POST',
      data: {
        optimisationSettings: e.currentTarget.dataset.optimisation,
        toBeAllocated: e.currentTarget.dataset.pendingAllocation
      }
    }).then(response => {
      return response
    }).then(obj => {
      dispatch(updateCollateral(fromJS(obj.data.collateral)))
      dispatch(initSelection(fromJS(obj.data.inMarginCall)))
    })
  },

  onRemoveFromEarmarked: (e, assetType, propAssetId, propAssetIdType) => {

    dispatch(removeAssetFromEarmark(e, assetType, propAssetId, propAssetIdType))
  }
})

const PledgeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgeComponent)

export default PledgeContainer