import { combineReducers } from 'redux'

import mainReducer from './reducer'
import ReconReducer from './ReconReducer'
import PledgeReducer from './PledgeReducer'

const reducer = combineReducers({
  mainReducer,
  ReconReducer,
  PledgeReducer
})

export default reducer
