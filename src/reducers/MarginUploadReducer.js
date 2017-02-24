import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD
} from '../constants/ActionTypes'
import {List, Map, fromJS} from 'immutable'

const initialState = Map({
  uploadData: List()
})

const MarginUploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MARGIN_CALL_UPLOAD:
      return state.set('uploadData', fromJS(action.uploadData))
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
    default:
      return state
  }
}

export default MarginUploadReducer