import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD,
  // UPDATE_TXN_ID,
  // POLL_MARGIN_CALL,
  REQUESTING_VALUATION,
  UPLOADING_PORTFOLIO,
  MARGIN_CALL_GENERATED,
  UPDATE_REQUESTING_STATE,
  ON_REQUEST_VALUATION,
  ON_REQUEST_GENERATE_MARGINCALL,
  ON_REQUEST_SEND_MARGINCALL,
  TOGGLE_SELECTED_MARGINCALL_ROW,
  TOGGLE_SELECT_ALL_MARGINCALLS,
  TOGGLE_VARIABLE_OPTIONS,
  ON_SEND_MARGINCALL_SUCCESS
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

// export const updateTxnID = (txnID) => ({
//   type: UPDATE_TXN_ID,
//   txnID
// })

// export const pollMarginCall = (txnID) => ({
//   type: POLL_MARGIN_CALL,
//   txnID
// })

export const requestingValuationFlag = () => ({
  type: REQUESTING_VALUATION
})

export const uploadingPortfolioFlag = () => ({
  type: UPLOADING_PORTFOLIO
})

export const marginCallGenerated = (updatedPortfolios) => ({
  type: MARGIN_CALL_GENERATED,
  updatedPortfolios
})

export const updateRequestState = flag => ({
  type: UPDATE_REQUESTING_STATE,
  flag
})

export const onRequestValuationAction = referenceIDs => ({
  type: ON_REQUEST_VALUATION,
  referenceIDs
})

export const onRequestGenerateMarginCall = referenceIDs => ({
  type: ON_REQUEST_GENERATE_MARGINCALL,
  referenceIDs
})

export const onRequestSendMarginCalls = referenceIDs => ({
  type: ON_REQUEST_SEND_MARGINCALL,
  referenceIDs
})

export const onToggleMarginCallRow = payload => ({
  type: TOGGLE_SELECTED_MARGINCALL_ROW,
  payload
})

export const onToggleAllMarginCallRows = () => ({
  type: TOGGLE_SELECT_ALL_MARGINCALLS
})

export const onToggleVariablOptions = (hasArr, dontHaveArr) => ({
  type: TOGGLE_VARIABLE_OPTIONS,
  hasArr,
  dontHaveArr
})

export const onMarginCallSendSuccess = successObj => ({
  type: ON_SEND_MARGINCALL_SUCCESS,
  successObj
})