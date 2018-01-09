import { connect } from 'react-redux'
import OptimisationWidget from '../components/pledge-optimisation/OptimisationWidget'
// import _ from 'lodash'
import { List, fromJS } from 'immutable'
//
import {
  updateOptimisationSettings,
  togglePendingAllocation,
  toggleCheckall,
  clearPendingAllocation,
  updatePledgeFilter,
  fetchOptimisationSettings,
  fetchSelection,
  allocateCollaterals,
  onPledge,
  onRemoveAllocatedAsset,
} from '../actions'
import { fetchDeployedOptimisationSettings, updateDeployedOptimisationSettings } from './../actions/DeployedActions'

import * as ASSET from '../constants/AllocatedAssetAttributes'
import * as P_ASSET from '../constants/PledgeAssetAttribute'
import filterItems from '../utils/filterItems'

const determineCheckboxStatus = (selectionSize, pendingAllocationSize) => {
  if(!selectionSize || (pendingAllocationSize === 0 && selectionSize !== 0))
    return ["./images/pledge/checkbox.png", "None"]
  else if(pendingAllocationSize >= selectionSize)
    return ["./images/pledge/checkboxwithtick.png", "All"]
  else
    return ["./images/common/minusbox.png", "Selected"]
}

const fetchAnalysisData = () => (
  // TODO: fetch statement
  [
    { name: 'Cash Only (Settlement CCY)', cost: 123456789, savings: 123456789, ratio: '1.00'},
    { name: 'Algorithm Suggestion', cost: 123456789, savings: 123456789, ratio: '1.00' },
    { name: 'Least Liquid Assets', cost: 123456789, savings: 123456789, ratio: '1.00' }
  ]
)

const checkIfExist = (something) => something || List()

// const updatePledgeListToSend = (assetList, pledgeToSend, guid) => {
//   assetList.map((asset) => {
//     // Create obj and push into array to send
//     pledgeToSend = [...pledgeToSend, {
//       [P_ASSET.P_MGN_STMT_ID]: guid,
//       [ASSET.A_ID]: asset[ASSET.A_ID],
//       [ASSET.A_QTY]: asset[ASSET.A_QTY],
//       [ASSET.A_FROM_ACCT]: asset[ASSET.A_FROM_ACCT],
//       "toAccount": asset.toAccount,
//       "marginCallId": asset.callId
//     }]
//   })
//   return pledgeToSend
// }

const mapStateToProps = state => ({
  optimisation: state.DeployedReducer.get('optimisation'),
  // allocating: state.PledgeReducer.get('allocating'),
  // selection: fromJS(
  //   filterItems(
  //     state.PledgeReducer.getIn(['pledgeData', 'selection']).toJS(),
  //     state.PledgeReducer.getIn(['pledgeData', 'filters']).toJS())),
  pendingAllocation: state.PledgeReducer.getIn(['pledgeData', 'pendingAllocation']),
  sliderCheckbox: determineCheckboxStatus(checkIfExist(state.PledgeReducer.getIn(['pledgeData', 'selection'])).size, checkIfExist(state.PledgeReducer.getIn(['pledgeData', 'pendingAllocation'])).size),
  scenarioAnalysis: fetchAnalysisData(),
  hideCheckboxes: true
})

const mapDispatchToProps = dispatch => {
  return {
    onInitOptimisationSettings: () => {
      dispatch(fetchDeployedOptimisationSettings())
    },
    // initSelection: () => {
    //   dispatch(fetchSelection())
    // },
    onUpdateOptimisationSettings: (newSettings) => {
      dispatch(updateDeployedOptimisationSettings(newSettings))
    },
    onTogglePendingAllocation: (GUID) => {
      dispatch(togglePendingAllocation(GUID))
    },
    onToggleCheckall: () => {
      dispatch(toggleCheckall())
    },
    // onClearPendingAllocation: () => {
    //   dispatch(clearPendingAllocation())
    // },
    onAllocate: (guids, optimisationSetting) => {
      const reqObj = {
        optimisationSettings: optimisationSetting,
        toBeAllocated: guids
      }

      dispatch(allocateCollaterals(reqObj))
    },
    onPledge: (selectionList) => {
      // console.log(selectionList);
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

      dispatch(onPledge(pledgeToSend))

      },
      // onDispatchRemoveAssetFromAllocate: (obj) => {
      //   dispatch(onRemoveAllocatedAsset(obj))
      //
      // },
      // resetFilters: () => dispatch(updatePledgeFilter({
      //   attr: 'notificationTime',
      //   selected: {
      //     label: '',
      //     value: ''
      //   }
      // }))
  }
}

// const checkAllocated = (selection) => (
//   (!checkIfExist(selection).isEmpty() ?
//     selection.filter((item) => item.has('allocated')).toJS() :
//     [])
// )

// const constructToBeRemovedFrom = (pending, selection) => (
//   _.concat(
//     _.reduce(
//       _.filter(selection,
//         x => _.includes(pending, x.GUID)),
//       (sum, x) => (_.has(x, ["allocated", "initialMargin"]) ?
//         _.concat(sum ,{"msId": x.GUID, "marginType": "initialMargin"}) :
//         sum), []),
//     _.reduce(
//       _.filter(selection, x => _.includes(pending, x.GUID)),
//       (sum, x) => (_.has(x, ["allocated", "variationMargin"]) ?
//         _.concat(sum ,{"msId": x.GUID, "marginType": "variationMargin"}) :
//         sum), []))
// )

// const mergeProps = (stateProps, dispatchProps) => ({
//   onRemoveAssetFromAllocate: (toBeExcluded, imFlag = true, vmFlag = true, toBeRemovedFrom = checkAllocated(stateProps.selection).map((item) => item.GUID)) => {
//     console.log({
//       currentItems: checkAllocated(stateProps.selection),
//       toBeRemoved: toBeExcluded,
//       toBeRemovedFrom: constructToBeRemovedFrom(toBeRemovedFrom, stateProps.selection.toJS()),
//       optimisationSettings: stateProps.optimisation.toJS(),
//       im: imFlag,
//       vm: vmFlag
//     })
//     // dispatchProps.onDispatchRemoveAssetFromAllocate({
//     //   currentItems: checkAllocated(stateProps.selection),
//     //   toBeRemoved: toBeExcluded,
//     //   toBeRemovedFrom: constructToBeRemovedFrom(toBeRemovedFrom, stateProps.selection.toJS()),
//     //   optimisationSettings: stateProps.optimisation.toJS(),
//     //   im: imFlag,
//     //   vm: vmFlag
//     // })
//   }, ...stateProps, ...dispatchProps
// })


const DeployedOptimisationContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  // mergeProps
)(OptimisationWidget)

export default DeployedOptimisationContainer
