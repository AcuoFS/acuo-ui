import * as ActionTypes from '../constants/ActionTypes'
import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

const initState = Map({"items":   List(),
                       "filters": List()})

const initFilters = [
  {order: 1, attr: "legalEntity", selected:"", label: "Legal Entity"},
  {order: 2, attr: "type",        selected:"", label: "Deriv Type"},
  {order: 3, attr: "time",        selected:"", label: "Time Window", type: "time"},
  {order: 4, attr: "cptyOrg",     selected:"", label: "CPTY Organisation"},
  {order: 5, attr: "cptyEntity",  selected:"", label: "CPTY Entity", type: "multi"},
]

const updateFilters = (filters, newFilters) => (
  _.reduce(newFilters, (filters, newFilter) => (
    _.map(filters, filter => (
      (filter.attr === newFilter.attr)
      ? _.set(filter, 'selected', newFilter.selected)
      : filter
    ))
  ), filters)
)

export default function reconReducer(state = initState, action) {
  switch(action.type) {
    case 'RECON_INIT_STATE':
      let items = action.items
      return state.set('items', fromJS(items))
                  .set('filters', fromJS(initFilters))

    case 'RECON_FILTER_SET':
      let newFilters = action.value
          filters = state.get('filters').toJS()

      let updatedFilters = updateFilters(filters, newFilters)
      return state.set('filters', fromJS(updatedFilters))

    default:
      return state
  }
}
