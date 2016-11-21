import { connect } from 'react-redux'
import jsonObjectToFlatArray from '../utils/jsonObjectToFlatArray'
import {
    filterStateLegal,
    filterStateDeriv,
    filterStateStatus,
    filterCptyOrg,
    filterCptyEntity
} from '../actions'
import { FilterBarComponent } from '../components'
import { Set } from 'immutable'


const mapStateToProps = state => ({
    derivatives : state.getIn(['data', 'derivatives']),
    filters: state.getIn(['inputs', 'filters']),
    legalEntityList : computeLegalEntityList(state.getIn(['data', 'derivatives'])),
    derivativeType : computeDerivativeType(),
    statusList : computeStatusList(),
    cptyOrganisation : computeCptyOrganisation(),
    cptyEntity : computecptyEntity()
})



const computeLegalEntityList = (derivatives) => {
    //Have to refactor after code merge - map -> set -> list
    let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
    let legalEntityList = derivativeList.map(entry => entry.legalEntity)
    let  legalEntitySet = Set(legalEntityList)
    return legalEntitySet.toArray()
}

const computeDerivativeType = () => ([])

const computeStatusList = () => ([])

const computeCptyOrganisation = () => ([])

const computecptyEntity = () => ([])



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
)(FilterBarComponent)

export default FilterContainer