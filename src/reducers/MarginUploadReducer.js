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
  TOGGLE_SELECT_ALL_MARGINCALLS,
  TOGGLE_VARIABLE_OPTIONS,
  ON_SEND_MARGINCALL_SUCCESS,
  ON_UPLOAD_ERROR
} from '../constants/ActionTypes'

const initialState = Map({
  uploadData: List(),
  txnID: '',
  requestingValuation: false,
  uploading: false,
  requestingMCGenerationOrValuation: false,
  selectedRows: List(),
  marginCallRows: List(),
  uploadError: '',
  variableOptions: fromJS([
    {
      label: "All",
      has: ["portfolioId"],
      dontHave: ["afagdfhrthtyhtrshwefg34y56uewrgsfaw3caw!@$#"]
    },
    {
      label: "None",
      has: ["afagdfhrthtyhtrshwefg34y56uewrgsfaw3caw!@$#"],
      dontHave: ["portfolioId"]
    },
    {
      label: "Incomplete Val", //have exposure, dont have agreement details
      has: ["exposure"],
      dontHave: ["agreementDetails", "tradeValue"]
    },
    {
      label: "No Calls generated", // ave agreement deails, dont have erference id
      has: ["agreementDetails", "tradeValue"],
      dontHave: ["referenceIdentifier"]
    },
    {
      label: "Calls generated", //have reference id
      has: ["referenceIdentifier"],
      dontHave: ["afagdfhrthtyhtrshwefg34y56uewrgsfaw3caw!@$#"]
    }
  ]),
  selectedVariableOption: Map({ /*** unsed at the moment ***/
    label: "None",
    has: ["portfolioId"],
    dontHave: ["afagdfhrthtyhtrshwefg34y56uewrgsfaw3caw!@$#"]
  })
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
      return state.withMutations((state) => state.set('uploading', true).set('uploadData', List()).set('uploadError', ""))

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

    case TOGGLE_VARIABLE_OPTIONS:
      // console.log(action.hasArr, action.dontHaveArr)
      // console.log(state.get('uploadData').filter(x => {
      //   console.log(x.getIn(action.dontHaveArr))
      //   console.log(!x.getIn(action.dontHaveArr))
      //   // console.log(if(!parseInt(x.getIn(action.dontHaveArr))))
      //   return (x.getIn(action.hasArr) && !x.getIn(action.dontHaveArr))
      // }).toJS())

      const newUploadData = state.get('uploadData').filter(x => x.getIn(action.hasArr) && !x.getIn(action.dontHaveArr)).toJS()

      const newSelectedRows = _.map(newUploadData, x => x.portfolioId)

      let newMarginCallRows = []
      if(_.has(action.hasArr))
        newMarginCallRows = _.map(newUploadData, x => x.referenceIdentifier)

      return state.withMutations(state => state.set('selectedRows', fromJS(newSelectedRows)).set('marginCallRows', fromJS(newMarginCallRows)))

    case ON_SEND_MARGINCALL_SUCCESS:

      const successesArr =_.map(action.successObj, x => x.call.id)
      // console.log(successesArr)
      const successUploadData = state.get('uploadData').filter(x => !(x.get('referenceIdentifier') && _.includes(successesArr, x.get('referenceIdentifier'))))

      const failedRowsPID = successUploadData.filter(x => x.referenceIdentifier).map(x => x.portfolioId)
      const failedMarginCallRows = successUploadData.filter(x => x.referenceIdentifier).map(x => x.referenceIdentifier)

      return state.withMutations(state => state.set('uploadData', successUploadData).set('selectedRows', failedRowsPID).set('marginCallRows', failedMarginCallRows))
      // return state

    case ON_UPLOAD_ERROR:
      return state.withMutations(state => state.set('uploadError', action.message).set('uploading', false))

    default:
      return state
  }
}

export default MarginUploadReducer