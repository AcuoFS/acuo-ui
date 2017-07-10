import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD,
  UPDATE_TXN_ID,
  REQUESTING_VALUATION,
  UPLOADING_PORTFOLIO,
  MARGIN_CALL_GENERATED
} from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'

const initialState = Map({
  uploadData: List(),
  txnID: '',
  requestingValuation: false,
  uploading: false
})

const MarginUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MARGIN_CALL_UPLOAD:
      return state.withMutations((state) => state.set('uploadData', fromJS(action.uploadData).toList()).set('txnID', '').set('requestingValuation', false).set('uploading', false))

    case UPDATE_MARGIN_CALL_UPLOAD:
      return state.set('uploadData',
        state.get('uploadData').map(
          uploadRecord => {
            if (uploadRecord.get('mgnCallUploadId') == action.uploadId) {
              return uploadRecord.set('totalCallAmount', action.newTotalCallAmt)
            } else {
              return uploadRecord
            }
          }
        ))

    case UPDATE_TXN_ID:
      return state.withMutations((state) => state.set('txnID', fromJS(action.txnID)).set('uploading', false))

    case REQUESTING_VALUATION:
      return state.set('requestingValuation', true)

    case UPLOADING_PORTFOLIO:
      return state.withMutations((state) => state.set('uploading', true).set('uploadData', List()))

    case MARGIN_CALL_GENERATED:
      console.log(action.updatedPortfolios)

      // "2017/07/04"
      // callType
      //   :
      //   "Variation"
      // currency
      //   :
      //   "NZD"
      // exposure
      //   :
      //   "0.00"
      // marginAgreement
      //   :
      //   "a22"
      // pendingCollateral
      //   :
      //   "0.00"
      // referenceIdentifier
      //   :
      //   "a3f1aed9"
      // totalCallAmount
      //   :
      //   "0.00"
      // valuationDate
      //   :
      //   "2017/07/04"
      return state.set('uploadData', state.get('uploadData').map(x => {
        const flag = action.updatedPortfolios.uploadMarginCallDetails.filter(y => {
          return x.get('marginAgreement') === y.marginAgreement
        })
        if(flag.length)
          return fromJS(flag[0])
        else
          return x
      }))

    default:
      return state
  }
}

export default MarginUploadReducer