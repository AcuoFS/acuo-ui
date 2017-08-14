/**
 * Created by Rui on 1/6/17.
 */
import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

import * as ActionTypes from './../constants/ActionTypes'

const INITIAL_STATE = Map({'alerts': List(), 'noPrompt': true})

const CommonReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ActionTypes.UPDATE_NAVBAR_ALERTS:
      return state.set('alerts', fromJS(action.alerts))

    case ActionTypes.UPDATE_LOGIN_PROCESS:
      return state.set('processingLogin', fromJS(action.status))

    case ActionTypes.SCREEN_RESIZE:
      return state.set('noPrompt', action.noPrompt)

    default:
      return state
  }
}

export default CommonReducer