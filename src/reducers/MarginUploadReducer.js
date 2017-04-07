import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD,
  UPDATE_TXN_ID
} from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'

const initialState = Map({
  uploadData: List(),
  txnID: ''
})

const MarginUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MARGIN_CALL_UPLOAD:
      // console.log(action.uploadData)
      // console.log(fromJS(action.uploadData))

      return state.set('uploadData', fromJS(action.uploadData).toList())
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
      return state.set('txnID', fromJS(action.txnID))
    default:
      return state
  }
}

export default MarginUploadReducer