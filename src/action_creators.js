export function initState(state) {

    return {
        type: 'INIT_STATE',
        state: state
    }
}

export function filterStateDeriv(derivType) {

    return {
        type: 'FILTER_STATE_DERIV',
        filter: derivType
    }
}

export function filterStateLegal(legalEntity) {

    return {
        type: 'FILTER_STATE_LEGAL',
        filter: legalEntity
    }
}

export function filterStateStatus(status) {

    return {
        type: 'FILTER_STATE_STATUS',
        filter: status
    }
}

