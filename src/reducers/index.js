import {combineReducers} from 'redux'

import mainReducer from './reducer'
import ReconReducer from './ReconReducer'
import PledgeReducer from './PledgeReducer'
import MarginUploadReducer from './MarginUploadReducer'
import UnmatchedPortfolioReducer from './UnmatchedPortfolioReducer'

const reducer = combineReducers({
  mainReducer,
  ReconReducer,
  PledgeReducer,
  MarginUploadReducer,
  UnmatchedPortfolioReducer
})

export default reducer
