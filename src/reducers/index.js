import {combineReducers} from 'redux'

import mainReducer from './reducer'
import PledgeReducer from './PledgeReducer'
import {MarginUploadReducer} from './MarginUploadReducer'

const reducer = combineReducers({
  mainReducer,
  PledgeReducer,
  MarginUploadReducer
})

export default reducer