import {List, Map, fromJS} from 'immutable'
import _ from 'lodash'

import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD,
  REQUESTING_VALUATION,
  UPLOADING_PORTFOLIO,
  MARGIN_CALL_GENERATED,
  UPDATE_REQUESTING_STATE,
  TOGGLE_SELECTED_MARGINCALL_ROW,
  TOGGLE_SELECT_ALL_MARGINCALLS
} from '../constants/ActionTypes'

const initialState = Map({
  uploadData: List(),
  txnID: '',
  requestingValuation: false,
  uploading: false,
  requestingMCGenerationOrValuation: false,
  selectedRows: List(),
  marginCallRows: List()
})

const toggleMarginCallRow = (marginCalldRows, rowObj) => {
  if(_.includes(marginCalldRows, rowObj.referenceIdentifier)){
    return _.remove(marginCalldRows, x => x !== rowObj.referenceIdentifier)
  }else{
    return [...marginCalldRows, rowObj.referenceIdentifier]
  }
}

const toggleSelectedRow = (selectedRows, rowObj) => {
  if(_.includes(selectedRows, rowObj.portfolioId)){
    return _.remove(selectedRows, x => x !== rowObj.portfolioId)
  }else{
    return [...selectedRows, rowObj.portfolioId]
  }
}

/** if(this.state.selectedRows.length){
  let marginCallRows =
    this.props.uploadData.filter(x => _.has(x, 'referenceIdentifier') && (_.indexOf(this.state.selectedRows, x.portfolioId) >= 0 )).map(x => x.referenceIdentifier)
  if(!_.isEqual(this.state.marginCallRows, marginCallRows))
    this.setState({
      marginCallRows: marginCallRows
    })
}
*/

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
      }))
        .set('requestingMCGenerationOrValuation', false)
        .set('marginCallRows', action.updatedPortfolios.uploadMarginCallDetails.reduce((sum, x) => (x.referenceIdentifier ? sum.concat(x.referenceIdentifier) : sum), List())))

    case TOGGLE_SELECTED_MARGINCALL_ROW:
      let newState = state
      const rowObj = action.payload

      const selectedRows = toggleSelectedRow(state.get('selectedRows').toJS(), rowObj)

      if(rowObj.referenceIdentifier){
        const marginCallRows = toggleMarginCallRow(state.get('marginCallRows').toJS(), rowObj)

        newState = state.withMutations(state => state.set('selectedRows', fromJS(selectedRows)).set('marginCallRows',fromJS(marginCallRows)))
      }else{
        newState = state.set('selectedRows', fromJS(selectedRows))
      }

      return newState

    case TOGGLE_SELECT_ALL_MARGINCALLS:
      let selectedRows1 = List()
      let marginCallRows = List()

      if(!state.get('selectedRows').size){
        selectedRows1 = state.get('uploadData').map(x => x.get('portfolioId'))
        marginCallRows = state.get('uploadData').reduce((sum, x) =>
          (x.get('referenceIdentifier') ? sum.push(x.get('referenceIdentifier')) : sum)
          , List())
      }

      return state.withMutations(state => state.set('selectedRows', selectedRows1).set('marginCallRows', marginCallRows))

    default:
      return state
  }
}

export default MarginUploadReducer