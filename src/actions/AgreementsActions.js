import {
  INIT_AGREEMENT_SUMMARY,
  SET_AGREEMENT_TYPE_SELECTED,
  SET_CPTY_SUMMARY_EXPANDED
} from '../constants/ActionTypes'


export const initAgreementSummary = (summaryData) => ({
  type: INIT_AGREEMENT_SUMMARY,
  summaryData
})

export const setCptySummaryExpanded = (isCptySummaryExpanded) => ({
  type: SET_CPTY_SUMMARY_EXPANDED,
  isCptySummaryExpanded
})

export const setAgreementTypeSelected = (typeSelected) => ({
  type: SET_AGREEMENT_TYPE_SELECTED,
  typeSelected
})