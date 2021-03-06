import { connect } from 'react-redux'
import _ from 'lodash'
import { FilterBarReconPageComponent } from '../components'
import filterItems from '../utils/filterItems'
import * as ActionTypes from '../constants/ActionTypes'
import { updateReconFilter } from '../actions'

const mapStateToProps = state => {
  const filters = state.ReconReducer.get('filters').toJS()
  const items   = state.ReconReducer.get('items').toJS()

  const filteredOutItems = filterItems(items, filters)

  const filterWithOptions = _.map(filters, filter => {
    const options = (((_.get(filter, 'type', 'single') === 'single') &&
    ((_.get(filter, 'attr') !== 'cptyOrg') && _.get(filter, 'attr') !== 'status')))
                    // if it is single-value filter
                    ? _.uniq(_.map(filteredOutItems, filter.attr))
                    // if it is non-single-value filter
                    : _.uniq(_.map(items, filter.attr))
    return _.set(filter, 'options', options)
  })

  return {
    filters: _.orderBy(filterWithOptions, 'order'),
  }
}

const mapDispatchToProps = dispatch => ({
  // use this function to dispatch an action to set filter
  // value here should be array with objects like {name, options, selected(str/[])}
  setFilter: (value) => dispatch(updateReconFilter(value)),
  removeDirectionFilter: () => (
    dispatch(updateReconFilter({
      attr: 'direction',
      selected: {
        label: "ALL",
        value: ""
      }
    })),
    dispatch(updateReconFilter({
      attr: 'notificationTime',
      selected: {
        label: "ALL",
        value: ""
      }
    })),
    dispatch(updateReconFilter({
      attr: 'type',
      selected: {
        label: "ALL",
        value: ""
      }
    })),
    dispatch(updateReconFilter({
      attr: 'cptyOrg',
      selected: {
        label: "ALL",
        value: ""
      }
    })),
    dispatch(updateReconFilter({
      attr: 'cptyEntity',
      selected: {
        label: "ALL",
        value: ""
      }
    })),
    dispatch(updateReconFilter({
      attr: 'legalEntity',
      selected: {
        label: "ALL",
        value: ""
      }
    }))
  )
})

const FilterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterBarReconPageComponent)

export default FilterContainer
