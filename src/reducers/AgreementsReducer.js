import {Map, List, fromJS} from 'immutable'
import {
  INIT_AGREEMENT_SUMMARY,
  SET_AGREEMENT_TYPE_SELECTED,
  SET_CPTY_SUMMARY_EXPANDED
} from '../constants/ActionTypes'
import * as CONSTANTS from '../constants/AgreementsConstants'


const initiatState = Map({
  // summaryData: Map({
  //   clientSummary: Map(),
  //   cptySummary: Map(),
  // }),
  summaryData: Map(),
  agreementsData: List(),
  isCptySummaryExpanded: false,
  typeSelected: CONSTANTS.AGREEMENT_TYPE_SELECTED_BOTH
})

const AgreementsReducer = (state = initiatState, action) => {
  switch (action.type) {
    case INIT_AGREEMENT_SUMMARY:
      return state.set('summaryData', fromJS(action.summaryData))
    case SET_CPTY_SUMMARY_EXPANDED:
      return state.set('isCptySummaryExpanded', action.isCptySummaryExpanded)
    case SET_AGREEMENT_TYPE_SELECTED:
      return state.set('typeSelected', action.typeSelected)
    default:
      return state
  }
}

export default AgreementsReducer