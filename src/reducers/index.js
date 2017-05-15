import {combineReducers} from 'redux'

import mainReducer from './reducer'
import ReconReducer from './ReconReducer'
import PledgeReducer from './PledgeReducer'
import MarginUploadReducer from './MarginUploadReducer'
import UnmatchedPortfolioReducer from './UnmatchedPortfolioReducer'
import DisputeReducer from './DisputeReducer'
import AgreementsReducer from './AgreementsReducer'
import AssetsReducer from './AssetsReducer'
import DeployedReducer from './DeployedReducer'

const reducer = combineReducers({
  mainReducer,
  ReconReducer,
  PledgeReducer,
  MarginUploadReducer,
  UnmatchedPortfolioReducer,
  DisputeReducer,
  AgreementsReducer,
  AssetsReducer,
  DeployedReducer
})

export default reducer
