import * as ActionTypes from '../constants/ActionTypes'
import {Map, List, fromJS} from 'immutable'

const initState = Map({"items": Map(), "filters": Map()})

export default function reconReducer(state = initState, action, store = 'recon') {

  switch(action.type) {
    case 'RECON_INIT_STATE':
      return state.set('items', fromJS(action.state))
    }
    return state
  }
