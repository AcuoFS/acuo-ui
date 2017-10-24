import {List, Map, fromJS} from 'immutable'
import _ from 'lodash'

import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD,
  REQUESTING_VALUATION,
  UPLOADING_PORTFOLIO,
  MARGIN_CALL_GENERATED,
  UPDATE_REQUESTING_STATE
} from '../constants/ActionTypes'

const initialState = Map({
  uploadData: List(),
  txnID: '',
  requestingValuation: false,
  uploading: false,
  requestingMCGenerationOrValuation: false,
  selectedRows: List()
})

/*** if (!actionIsChecked) {
  this.setState({
    selectedRows: [...this.state.selectedRows, rowObj.portfolioId],
  })
  if(rowObj.referenceIdentifier){
    this.setState({
      marginCallRows: [...this.state.marginCallRows, rowObj.referenceIdentifier],
    })
  }
}
// uncheck action from row
else {
  let marginCallRows = []

  let selectedRows = this.state.selectedRows.filter(row =>
  row !== rowObj.portfolioId)

  if(rowObj.referenceIdentifier){
    console.log(rowObj.referenceIdentifier)
    console.log(this.state.marginCallRows)
    marginCallRows =  this.state.marginCallRows.filter(row =>
    row !== rowObj.referenceIdentifier)

    console.log(marginCallRows)
  }
  this.setState({
    marginCallRows: marginCallRows,
    selectedRows: selectedRows
  })
}*/

const toggleSelectedRow = (selectedRows, rowObj) => {
  if(_.includes(selectedRows))
}

const MarginUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MARGIN_CALL_UPLOAD:
      return state.withMutations((state) => state.set('uploadData', fromJS(action.uploadData).toList()).set('txnID', '').set('requestingValuation', false).set('uploading', false))

    case UPDATE_MARGIN_CALL_UPLOAD:
      return state.set('uploadData',
        state.get('uploadData').map(
          uploadRecord => {
            if (uploadRecord.get('mgnCallUploadId') === action.uploadId) {
              return uploadRecord.set('totalCallAmount', action.newTotalCallAmt)
            } else {
              return uploadRecord
            }
          }
        ))

    case REQUESTING_VALUATION:
      return state.set('requestingValuation', true)

    case UPLOADING_PORTFOLIO:
      return state.withMutations((state) => state.set('uploading', true).set('uploadData', List()))

    case UPDATE_REQUESTING_STATE:
      return state.set('requestingMCGenerationOrValuation', action.flag)

    case MARGIN_CALL_GENERATED:
      //console.log(action.updatedPortfolios)
      return state.withMutations(state => state.set('uploadData', state.get('uploadData').map(x => {
        const flag = action.updatedPortfolios.uploadMarginCallDetails.filter(y => {
          return x.get('marginAgreement') === y.marginAgreement && x.get('callType') === y.callType
        })
        if(flag.length){
          // console.log({portfolioId: x.get('portfolioId'), ...flag[0]})
          return fromJS({portfolioId: x.get('portfolioId'), ...flag[0]})
        }
        else
          return x
      })).set('requestingMCGenerationOrValuation', false))

    // case TOGGLE_SELECTED_ROW:
    //   return state

    default:
      return state
  }
}

export default MarginUploadReducer