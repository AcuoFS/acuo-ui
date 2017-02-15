import {combineReducers} from 'redux'

import mainReducer from './reducer'
import ReconReducer from './ReconReducer'
import PledgeReducer from './PledgeReducer'
import MarginUploadReducer from './MarginUploadReducer'
import UnmatchedPortfolioReducer from './UnmatchedPortfolioReducer'
import DisputeReducer from './DisputeReducer'

const reducer = combineReducers({
  mainReducer,
  ReconReducer,
  PledgeReducer,
  MarginUploadReducer,
  UnmatchedPortfolioReducer,
  DisputeReducer
})

export default reducer
