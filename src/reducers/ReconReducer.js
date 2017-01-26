import * as ActionTypes from '../constants/ActionTypes'
import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

const initState = Map({"items":   List(),
                       "filters": List()})

const filterPropMapping = [
  {attr: "legalEntity", label: "Legal Entity"},
  {attr: "derivative",  label: "Deriv Type"},
  {attr: "time",        label: "Time Window", type: "time"},
  {attr: "cptyOrg",     label: "CPTY Organisation"},
  {attr: "cptyEntity",  label: "CPTY Entity", type: "multi"},
]

const updateFilters = (filters, newFilters) => {
  const newFilterAttrs = _.map(newFilters, 'attr')
  const untouchedFilters = _.filter(filters, ({attr}) => (!newFilterAttrs.includes(attr)))
  return _.concat(untouchedFilters, newFilters)
}

export default function reconReducer(state = initState, action) {
  switch(action.type) {
    case 'RECON_INIT_STATE':
      let items = action.items

      let filters = _.map(filterPropMapping, mapping => _.merge(mapping, {
        selected: "",
        options: uniqueInColumn(items, mapping.attr)
      }))

      return state.set('items', fromJS(items))
                  .set('filters', fromJS(filters))

    case 'RECON_FILTER_SET':
      let newFilters = action.value
          filters = state.get('filters').toJS()

      let updatedFilters = updateFilters(filters, newFilters)
      return state.set('filters', fromJS(updatedFilters))

    default:
      return state
    }
  }

// get unique value of one column from items
const uniqueInColumn = (items, column) => {
  return _.uniq(_.map(items, column))
}
