/**
 * Created by Rui on 28/8/17.
 */
import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

import * as ActionTypes from './../constants/ActionTypes'

const INITIAL_STATE_JS = {
  xAxis: {
    key: 'counterpartyAllegation',
    label: 'Counterpart estimation'
  },
  yAxis: {
    key: 'clientAllegation',
    label: 'ACUO estimation'
  }
}

const INITIAL_STATE = fromJS(INITIAL_STATE_JS)

const AnalyticsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ActionTypes.FLIP_AXES:
      const x = state.get('xAxis')

      return state.withMutations(state => state.set('xAxis', state.get('yAxis')).set('yAxis', x))

    default:
      return state
  }
}

export default AnalyticsReducer