import {
  INIT_DISPUTE,
  UPDATE_DISPUTE_FILTER
} from '../constants/ActionTypes'

export const initDispute = (disputeData) => ({
  type: INIT_DISPUTE,
  disputeData
})

export const updateDisputeFilter = (disputeFilter) => ({
  type: UPDATE_DISPUTE_FILTER,
  disputeFilter
})