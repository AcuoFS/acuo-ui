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

export function filterTimeWindowStatus(timewindow) {

    return {
        type: 'FILTER_STATE_TIMEWINDOW',
        filter: timewindow
    }
}

export function filterStateStatus(status) {

    return {
        type: 'FILTER_STATE_STATUS',
        filter: status
    }
}


export function filterCptyOrg(cptyOrg) {

    return {
        type: 'FILTER_STATE_CPTYORG',
        filter: cptyOrg
    }
}

export function filterCptyEntity(cptyEntity){
    return{
        type: 'FILTER_STATE_CPTYENTITY',
        filter : cptyEntity
    }
}

export const lineItemInsertion = (lineItem) => (
  {
      type: 'LINE_ITEM_INSERTION',
      addition : lineItem
  }
)

export const selectedItems = (id, item) => (
  {
      type: 'SELECT_ITEM',
      GUID: id,
      name: item
  }
)

export const reconItem = () => (
  {
    type: 'RECON_ITEM'
  }
)
