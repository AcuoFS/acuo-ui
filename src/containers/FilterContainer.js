import { connect } from 'react-redux'
import {
    filterStateLegal,
    filterStateDeriv,
    filterStateStatus,
    filterCptyOrg,
    filterCptyEntity
} from '../actions'
import { FilterComponent } from '../components'


const mapStateToProps = state => ({
    derivatives : state.getIn(['data', 'derivatives']),
    filters: state.getIn(['inputs', 'filters'])
})

const mapDispatchToProps = dispatch => ({

    onLegalEntityChange: (e) => {
        e.stopPropagation()
        dispatch(filterStateLegal(e.currentTarget.dataset.ref))
    },

    onDerivChange: (e) => {
        e.stopPropagation()
        dispatch(filterStateDeriv(e.currentTarget.dataset.ref))
    },

    onStatusChange: (e) => {
        e.stopPropagation()
        dispatch(filterStateStatus(e.currentTarget.dataset.ref))
    },

    onCptyOrgChange: (e) => {
        e.stopPropagation()
        dispatch(filterCptyOrg(e.currentTarget.dataset.ref))
    },

    onCPTYEntityChange: (e) => {
        e.stopPropagation()
        dispatch(filterCptyEntity(e.currentTarget.dataset.ref))
    }
})


const FilterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterComponent)

export default FilterContainer