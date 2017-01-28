import * as ActionTypes from '../constants/ActionTypes'
import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

const initState = Map({"items":   List(),
                       "filters": List()})

const initFilters = [
  {order: 1, attr: "legalEntity", label: "Legal Entity"},
  {order: 2, attr: "type",        label: "Deriv Type"},
  {order: 3, attr: "time",        label: "Time Window", type: "time"},
  {order: 4, attr: "cptyOrg",     label: "CPTY Organisation"},
  {order: 5, attr: "cptyEntity",  label: "CPTY Entity", type: "multi"},
]

const updateFilters = (filters, newFilter) => (
  _.map(filters, filter => (
    (filter.attr === newFilter.attr)
    ? _.set(filter, 'selected', newFilter.selected)
    : filter
    ))
)

export default function reconReducer(state = initState, action) {
  let items, filters, newFilter, updatedFilters

  switch(action.type) {
    case 'RECON_INIT_STATE':
      items = action.items
      return state.set('items', fromJS(items))
                  .set('filters', fromJS(initFilters))

    case 'RECON_FILTER_SET':
      newFilter = action.value
      filters = state.get('filters').toJS()
      updatedFilters = updateFilters(filters, newFilter)
      return state.set('filters', fromJS(updatedFilters))

    default:
      return state
  }
}
