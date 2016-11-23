import { connect } from 'react-redux'
import jsonObjectToFlatArray from '../utils/jsonObjectToFlatArray'
import {
    filterStateLegal,
    filterStateDeriv,
    filterStateStatus,
    filterCptyOrg,
    filterCptyEntity,
    filterTimeWindowStatus
} from '../actions'
import { FilterBarComponent } from '../components'
import { Set } from 'immutable'


const mapStateToProps = state => ({
    derivatives : state.getIn(['data', 'derivatives']),
    filters: state.getIn(['inputs', 'filters']),
    legalEntityList : computeLegalEntityList(state),
    derivativeType : computeDerivativeType(state),
    statusList : computeStatusList(state),
    cptyOrganisation : computeCptyOrganisation(state),
    cptyEntity : computecptyEntity()
})



const computeLegalEntityList = (state) => {
    let derivatives = state.getIn(['data', 'derivatives'])
    let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
    let legalEntitySet = derivativeList.reduce((entitySet, derivative) => (
        entitySet.add(derivative.legalEntity)
    ), Set())
    return legalEntitySet.toArray()
}

const computeDerivativeType = (state) => {
    let derivatives = state.getIn(['data', 'derivatives']) || []
    let derivativeTypeSet = derivatives.reduce((typeSet, derivative) => (
        typeSet.add(derivative.get('type'))
    ), Set())
    return derivativeTypeSet.toArray()
}

const computeStatusList = (state) => {
    let derivatives = state.getIn(['data', 'derivatives'])
    let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
    let marginStatusSet = derivativeList.reduce((marginStatus, derivative) => (
        marginStatus.add(derivative.status)
    ), Set())
    return marginStatusSet.toArray()
}

const computeCptyOrganisation = (state) => {
    let derivatives = state.getIn(['data', 'derivatives'])
    let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
    let cptyOrganisationSet = derivativeList.reduce((cptyOrganisation, derivative) => (
        cptyOrganisation.add(derivative.cptyOrg)
    ), Set())
    return cptyOrganisationSet.toArray()
}



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

    onCPTYEntityChange: ( entityList ,e ) => {
        //e.stopPropagation()
        dispatch(filterCptyEntity(entityList))
    },

    onFilterTimeWindowStatus : (timeWindowMin, timeWindowMax, e) => {
        dispatch(filterTimeWindowStatus(timeWindowMin, timeWindowMax))
    }
})


const FilterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBarComponent)

export default FilterContainer