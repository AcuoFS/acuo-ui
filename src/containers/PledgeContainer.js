import { connect } from 'react-redux'
import { PledgeComponent } from '../components'
import {
  initOptimisationSettings,
  updateOptimisationSettings,
  initSelection,
  togglePendingAllocation,
  toggleCheckall,
  clearPendingAllocation,
  updateCollateral,
  removeAssetFromEarmark } from '../actions'
import { List, fromJS } from 'immutable'
import {
  ALLOCATE_COLLATERALS_URL,
  ALLOCATE_COLLATERALS_URL_NEW,
  PLEDGE_ALLOCATIONS,
  MARGIN_SELECTION_URL
} from '../constants/APIcalls'
import * as ASSET from '../constants/AllocatedAssetAttributes'
import * as P_ASSET from '../constants/PledgeAssetAttribute'

const determineCheckboxStatus = (selectionSize, pendingAllocationSize) => {
  if(pendingAllocationSize >= selectionSize)
    return ["./images/pledge/checkboxwithtick.png", "All"]
  else if(pendingAllocationSize == 0 && selectionSize != 0)
    return ["./images/pledge/checkbox.png", "None"]
  else
    return ["./images/common/minusbox.png", "Selected"]
}

const checkIfExist = (something) => something || List()

const updatePledgeListToSend = (assetList, pledgeToSend, guid) => {
  assetList.map((asset) => {
    // Create obj and push into array to send
    pledgeToSend = [...pledgeToSend, {
      [P_ASSET.P_MGN_CALL_ID]: guid,
      [ASSET.A_ID]: asset[ASSET.A_ID],
      [ASSET.A_QTY]: asset[ASSET.A_QTY],
      [ASSET.A_FROM_ACCT]: asset[ASSET.A_FROM_ACCT]
    }]
  })
  return pledgeToSend
}

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
    dispatch(initSelection(selection.items))
  },
  onTogglePendingAllocation: (GUID) => {
    dispatch(togglePendingAllocation(GUID))
  },
  onToggleCheckall: () => {
    dispatch(toggleCheckall())
  },
  onClearPendingAllocation: () => {
    dispatch(clearPendingAllocation())
  },
  // onAllocate_old: (guids, optimisationSetting) => {
  //   const data = {guids, optimisationSetting}
  //   fetch(ALLOCATE_COLLATERALS_URL, {
  //     method: 'POST',
  //     body: JSON.stringify(data)
  //   }).then(response => {
  //     return response.json()
  //   }).then(obj => {
  //     // dispatch(updateCollateral(fromJS(obj.data.collateral)))
  //     dispatch(initSelection(fromJS(obj.items)))
  //   })
  // },
  onAllocate: (guids, optimisationSetting) => {
    fetch(ALLOCATE_COLLATERALS_URL_NEW, {
      method: 'POST',
      body: JSON.stringify({
        optimisationSettings: optimisationSetting,
        toBeAllocated: guids
      })
    }).then(response => {
      return response.json()
    }).then(obj => {
      dispatch(initSelection(fromJS(obj.items)))
    })
  },
  onRemoveFromEarmarked: (e, assetType, propAssetId, propAssetIdType) => {

    dispatch(removeAssetFromEarmark(e, assetType, propAssetId, propAssetIdType))
  },
  onPledge: (selectionList) => {
    let pledgeToSend = []
    selectionList.map((statement) => {
      // Check statement w allocations
      if (statement.allocated && statement.allocated[ASSET.A_LIST_IM]) {
        pledgeToSend =
          updatePledgeListToSend(
            statement.allocated[ASSET.A_LIST_IM],
            pledgeToSend,
            statement.GUID)
      }
      if (statement.allocated && statement.allocated[ASSET.A_LIST_VM]) {
        pledgeToSend =
          updatePledgeListToSend(
            statement.allocated[ASSET.A_LIST_VM],
            pledgeToSend,
            statement.GUID)
      }
    })

    fetch(PLEDGE_ALLOCATIONS, {
      method: 'POST',
      body: JSON.stringify(pledgeToSend)
    }).then(response => {
      if (response.status == 200) {
        // TODO: To handle how to inform user that pledge data is sucessfully sent
        alert('Sent to endpoint!' + JSON.stringify(pledgeToSend))
        // Refresh selections
        fetch(MARGIN_SELECTION_URL).then(response => {
          return response.json()
        }).then(obj => {
          dispatch(initSelection(obj.items))
          dispatch(clearPendingAllocation())
        })
      } else {
        alert('Error sending pledge details')
      }
    })
  }
})

const PledgeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgeComponent)

export default PledgeContainer
