import {
  INIT_UNMATCHED_PORTFOLIO
} from '../constants/ActionTypes'

export const initUnmatchedPortfolio = (unmatchedPortfolios) => ({
  type: INIT_UNMATCHED_PORTFOLIO,
  unmatchedPortfolios
})