import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD,
  UPDATE_TXN_ID
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

export const updateTxnID = (txnID) => ({
  type: UPDATE_TXN_ID,
  txnID
})