import {combineReducers} from 'redux'

import mainReducer from './reducer'
import ReconReducer from './ReconReducer'
import PledgeReducer from './PledgeReducer'
import {MarginUploadReducer} from './MarginUploadReducer'

const reducer = combineReducers({
  mainReducer,
  ReconReducer,
  PledgeReducer,
  MarginUploadReducer
})

export default reducer
