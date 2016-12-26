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
    filters: state.mainReducer.getIn(['inputs', 'filters']),
    legalEntityList : computeLegalEntityList(state.mainReducer),
    derivativeType : computeDerivativeType(state.mainReducer),
    timeWindowList : computeTimeWindowList(state.mainReducer),
    statusList : computeStatusList(state.mainReducer),
    cptyOrganisation : computeCptyOrganisation(state.mainReducer),
    cptyEntity : computeCptyEntity(state.mainReducer)
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

const computeTimeWindowList = (state) => {

    return [
        {min: 'All', text: 'ALL'},
        {min: '0', max: '3', text: '0H - 3H'},
        {min: '03', max: '6', text: '3H - 6H'},
        {min: '06', max: '9', text: '6H - 9H'},
        {min: '09', max: '12', text: '9H - 12H'},
        {min: '12', max: '15', text: '12H - 15H'},
        {min: '15', max: '18', text: '15H - 18H'},
        {min: '18', max: '21', text: '18H - 21H'},
        {min: '21', max: '0', text: '21H - 24H'},
    ]
}

const computeCptyEntity = (state) => {

    let cptyEntityFilter = state.getIn(['inputs', 'filters', 'cptyEntityFilter', 'filter']) || Set()
    let cptyOrgFilter = state.getIn(['inputs', 'filters', 'cptyOrgFilter', 'filter'])

    let derivatives = state.getIn(['data', 'derivatives'])
    let derivativeList = derivatives ? jsonObjectToFlatArray(derivatives.toJSON()) : []
    let cptyEntityList = derivativeList.reduce((listSum, x)=> {
        if (cptyOrgFilter && cptyOrgFilter != 'All') {
            return (!listSum.includes(x.cptyEntity) && x.cptyOrg == cptyOrgFilter ? listSum.add(x.cptyEntity) : listSum)
        } else {
            return (!listSum.includes(x.cptyEntity) ? listSum.add(x.cptyEntity) : listSum)
        }
    }, Set()).sort()

    if (cptyEntityFilter.size > 0)
        return cptyEntityList.filter(x =>
          cptyEntityFilter.includes(x)
        ).toOrderedSet().sort().union(cptyEntityList.filter(x =>
          !cptyEntityFilter.includes(x)
        ).toOrderedSet().sort()).toArray()
    else
      return cptyEntityList.toArray()
}



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

    onFilterTimeWindowStatus : (timeWindowMin, timeWindowMax, timeRangeText) => {
        dispatch(filterTimeWindowStatus(timeWindowMin, timeWindowMax, timeRangeText))
    }
})


const FilterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterBarComponent)

export default FilterContainer