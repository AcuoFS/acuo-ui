export function initState(state) {

    return {
        type: 'INIT_STATE',
        state: state
    }
}

export function filterState(derivType) {

    return {
        type: 'FILTER_STATE',
        filter: derivType
    }
}

