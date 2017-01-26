import * as ActionTypes from '../constants/ActionTypes'
import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

const initState = Map({"items":   List(),
                       "filters": List()})

const updateFilters = (filters, newFilters) => {
  const newFilterNames = _.map(newFilters, 'name')
  const untouchedFilters = _.filter(filters, ({name}) => (!newFilterNames.includes(name)))
  return _.concat(untouchedFilters, newFilters)
}

export default function reconReducer(state = initState, action) {
  switch(action.type) {
    case 'RECON_INIT_STATE':
      return state.set('items', fromJS(action.state))

    case 'RECON_FILTER_SET':
      const newFilters = action.value
      const filters = state.get('filters').toJS()
      const updatedFilters = updateFilters(filters, newFilters)
      return state.set('filters', fromJS(updatedFilters))

    default:
      return state
    }
  }
