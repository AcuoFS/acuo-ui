import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD
} from '../constants/ActionTypes'

export const getMarginCallUpload = (uploadData) => ({
  type: GET_MARGIN_CALL_UPLOAD,
  uploadData
})

export const updateMarginCallUpload = (newTotalCallAmt, uploadId) => ({
  type: UPDATE_MARGIN_CALL_UPLOAD,
  newTotalCallAmt,
  uploadId
})