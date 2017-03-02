import {Map, List, fromJS} from 'immutable'
import {
  INIT_AGREEMENT_SUMMARY,
  SET_CPTY_SUMMARY_EXPANDED,
  INIT_AGREEMENT
} from '../constants/ActionTypes'


const initiatState = Map({
  // summaryData: Map({
  //   clientSummary: Map(),
  //   cptySummary: Map(),
  // }),
  summaryData: Map(),
  agreementsData: List(),
  isCptySummaryExpanded: false,
})

const AgreementsReducer = (state = initiatState, action) => {
  switch (action.type) {
    case INIT_AGREEMENT_SUMMARY:
      return state.set('summaryData', fromJS(action.summaryData))
    case SET_CPTY_SUMMARY_EXPANDED:
      return state.set('isCptySummaryExpanded', action.isCptySummaryExpanded)
    case INIT_AGREEMENT:
      return state.set('agreementsData', fromJS(action.agreementsData))
    default:
      return state
  }
}

export default AgreementsReducer