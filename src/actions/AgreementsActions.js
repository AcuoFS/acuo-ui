import {
  INIT_AGREEMENT_SUMMARY,
  SET_CPTY_SUMMARY_EXPANDED,
  INIT_AGREEMENT
} from '../constants/ActionTypes'


export const initAgreementSummary = (summaryData) => ({
  type: INIT_AGREEMENT_SUMMARY,
  summaryData
})

export const setCptySummaryExpanded = (isCptySummaryExpanded) => ({
  type: SET_CPTY_SUMMARY_EXPANDED,
  isCptySummaryExpanded
})

export const initAgreements = (agreementsData) => ({
  type: INIT_AGREEMENT,
  agreementsData
})