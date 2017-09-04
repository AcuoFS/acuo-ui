import {combineReducers} from 'redux'
import {reducer as NotificationReducer} from 'react-notification-system-redux'

import mainReducer from './reducer'
import ReconReducer from './ReconReducer'
import PledgeReducer from './PledgeReducer'
import MarginUploadReducer from './MarginUploadReducer'
import UnmatchedPortfolioReducer from './UnmatchedPortfolioReducer'
import DisputeReducer from './DisputeReducer'
import AgreementsReducer from './AgreementsReducer'
import AssetsReducer from './AssetsReducer'
import DeployedReducer from './DeployedReducer'
import CommonReducer from './CommonReducer'
import AnalyticsReducer from './AnalyticsReducer'

const reducer = combineReducers({
  mainReducer,
  ReconReducer,
  PledgeReducer,
  MarginUploadReducer,
  UnmatchedPortfolioReducer,
  DisputeReducer,
  AgreementsReducer,
  AssetsReducer,
  DeployedReducer,
  NotificationReducer,
  CommonReducer,
  AnalyticsReducer
})

export default reducer
