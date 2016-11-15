import * as ActionTypes from '../constants/ActionTypes'


export const initState = (state) => ({
    type: ActionTypes.INIT_STATE,
    state: state
})

export const filterStateDeriv = (derivType) => ({
    type: ActionTypes.FILTER_STATE_DERIV,
    filter: derivType
})

export const filterStateLegal = (legalEntity) => ({
    type: ActionTypes.FILTER_STATE_LEGAL,
    filter: legalEntity
})

export const filterStateStatus = (status) => ({
    type: ActionTypes.FILTER_STATE_STATUS,
    filter: status
})

export const filterCptyOrg = (cptyOrg) =>({
    type: ActionTypes.FILTER_STATE_CPTYORG,
    filter: cptyOrg
})

export const filterCptyEntity = (cptyEntity) => ({
    type: ActionTypes.FILTER_STATE_CPTYENTITY,
    filter: cptyEntity
})