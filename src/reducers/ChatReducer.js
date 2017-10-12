/**
 * Created by Rui on 26/9/17.
 */
import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

import * as ActionTypes from './../constants/ActionTypes'

const INITIAL_STATE = Map({
  'opened': false,
  'minimised': false })

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ActionTypes.TOGGLE_CHAT_OPEN:
      return state.set('opened', !state.get('opened'))

    case ActionTypes.TOGGLE_CHAT_MINIMISE:
      return state.set('minimised', !state.get('minimised'))

    case ActionTypes.OPEN_CHAT:
      return state.withMutations(state => state.set('opened', true).set('minimised', false))

    default:
      return state
  }
}
