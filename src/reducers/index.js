import { combineReducers } from 'redux'

import mainReducer from './reducer'
import PledgeReducer from './PledgeReducer'

const reducer = combineReducers({
  mainReducer,
  PledgeReducer
})

export default reducer