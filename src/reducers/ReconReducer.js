import * as ActionTypes from '../constants/ActionTypes'
import {Map, List, fromJS} from 'immutable'

const initState = Map({"items":   List(),
                       "filters": Map()})

export default function reconReducer(state = initState, action) {
  switch(action.type) {
    case 'RECON_INIT_STATE':
      return state.set('items', fromJS(action.state))

    case 'RECON_FILTER_SET':
      const {filter, value} = action
      return state.setIn(['filters', filter], value)

    default:
      return state
    }
  }
