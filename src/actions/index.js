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

export const filterTimeWindowStatus = (timeWindowMin, timeWindowMax) =>({
    type: ActionTypes.FILTER_STATE_TIMEWINDOW,
    minTime: timeWindowMin,
    maxTime : timeWindowMax
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

export const lineItemInsertion = (lineItem) => ({
    type: ActionTypes.LINE_ITEM_INSERTION,
    addition : lineItem
})

export const selectedItems = (id, item) => ({
    type: ActionTypes.SELECT_ITEM,
    GUID: id,
    name: item
})

export const reconItem = () => ({
    type: ActionTypes.RECON_ITEM
})