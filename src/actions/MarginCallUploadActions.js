import {
  GET_MARGIN_CALL_UPLOAD,
  UPDATE_MARGIN_CALL_UPLOAD,
  // UPDATE_TXN_ID,
  // POLL_MARGIN_CALL,
  REQUESTING_VALUATION,
  UPLOADING_PORTFOLIO,
  MARGIN_CALL_GENERATED,
  UPDATE_REQUESTING_STATE,
  ON_REQUEST_VALUATION
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