import { connect } from 'react-redux'
import { PledgeComponent } from '../components'
import _ from 'lodash'

import {
  initOptimisationSettings,
  updateOptimisationSettings,
  initSelection,
  togglePendingAllocation,
  toggleCheckall,
  clearPendingAllocation} from '../actions'
import { List, fromJS } from 'immutable'
import {
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

const fetchAnalysisData = () => (
  // TODO: fetch statement
  [
    { name: 'All Cash Settlement (CCY)', cost: 123456789, savings: 123456789, ratio: '1.00'},
    { name: 'Algorithm Suggestion', cost: 123456789, savings: 123456789, ratio: '1.00' },
    { name: 'Least Liquid Assets', cost: 123456789, savings: 123456789, ratio: '1.00' }

  ]
)

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
  optimisation: state.PledgeReducer.getIn(['pledgeData', 'optimisation']),
  selection: state.PledgeReducer.getIn(['pledgeData', 'selection']),
  pendingAllocation: state.PledgeReducer.getIn(['pledgeData', 'pendingAllocation']),
  sliderCheckbox: determineCheckboxStatus(checkIfExist(state.PledgeReducer.getIn(['pledgeData', 'selection'])).size, checkIfExist(state.PledgeReducer.getIn(['pledgeData', 'pendingAllocation'])).size ),
  scenarioAnalysis: fetchAnalysisData()
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
  onAllocate: (guids, optimisationSetting) => {
    const reqObj = {
      optimisationSettings: optimisationSetting,
      toBeAllocated: guids
    }
    //console.log('request obj: ' + JSON.stringify(reqObj))
    fetch(ALLOCATE_COLLATERALS_URL_NEW, {
      method: 'POST',
      body: JSON.stringify(reqObj)
    }).then(response => {
      //console.log('Allocate response: ' + JSON.stringify(response))
      return response.json()
    }).then(obj => {
      dispatch(initSelection(fromJS(obj.items)))
    }).catch(error => {
      console.log('Error: ' + error)
    })
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
      console.log('Pledge response: ' + response)
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
    }).catch(error => {
      console.log('Error: ' + error)
    })
  },
  onDispatchRemoveAssetFromAllocate: (obj) => {
    //TODO: implement fetch to send this obj to backend
    console.log('JS obj :')
    console.log(obj)
    console.log('JSON string :')
    console.log(JSON.stringify(obj))
    fetch('http://collateral.acuo.com/acuo/api/optimization/update', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {'content-type': 'application/json'},
      json: true,
      resolveWithFullResponse: true
    }).then(response => {
      console.log('remove allocation response: ')
      console.log(response)
      if (response.status == 200) {
        // TODO: To handle how to inform user that pledge data is sucessfully sent
        alert('Sent to endpoint!' + JSON.stringify(obj))
        // Refresh selections
        // fetch(MARGIN_SELECTION_URL).then(response => {
        //   return response.json()
        // }).then(obj => {
        //   dispatch(initSelection(obj.items))
        // })
      } else {
        alert('Error sending pledge details')
      }
    }).catch(error => {
      console.log('Error: ' + error)
    })
  }
})

const checkAllocated = (selection) => (
  (!checkIfExist(selection).isEmpty() ?
    selection.filter((item) => item.has('allocated')).toJS() :
    [])
)

const constructToBeRemovedFrom = (pending, selection) => (
  _.concat(
    _.reduce(
      _.filter(selection,
        x => _.includes(pending, x.GUID)),
      (sum, x) => (_.has(x, ["allocated", "initialMargin"]) ?
        _.concat(sum ,{"msId": x.GUID, "marginType": "initial"}) :
        sum), []),
    _.reduce(
      _.filter(selection, x => _.includes(pending, x.GUID)),
      (sum, x) => (_.has(x, ["allocated", "variationMargin"]) ?
        _.concat(sum ,{"msId": x.GUID, "marginType": "variation"}) :
        sum), []))
)

const mergeProps = (stateProps, dispatchProps) => ({
  onRemoveAssetFromAllocate: (toBeExcluded, toBeRemovedFrom = checkAllocated(stateProps.selection).map((item) => item.GUID)) => (
    dispatchProps.onDispatchRemoveAssetFromAllocate({
      currentItems: checkAllocated(stateProps.selection),
      toBeRemoved: toBeExcluded,
      toBeRemovedFrom: constructToBeRemovedFrom(toBeRemovedFrom, stateProps.selection.toJS()),
      optimisationSettings: stateProps.optimisation.toJS()
    })
  ), ...stateProps, ...dispatchProps
})


const PledgeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PledgeComponent)

export default PledgeContainer
