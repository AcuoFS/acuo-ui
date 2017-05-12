import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD,
  UPDATE_TXN_ID,
  REQUESTING_VALUATION,
  UPLOADING_PORTFOLIO
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
      // console.log(action.uploadData)
      // console.log(fromJS(action.uploadData))

      return state.withMutations((state) => state.set('uploadData', fromJS(action.uploadData).toList()).set('txnID', '').set('requestingValuation', false))

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

    default:
      return state
  }
}

export default MarginUploadReducer