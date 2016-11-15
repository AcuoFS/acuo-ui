import {Map, List, fromJS} from 'immutable'

export function initState(state, newJSON){
  return state.set('data', fromJS(newJSON)).set('display', fromJS(newJSON))
  //pushed into two separate nodes, data(for retention of persistent data), display(for rendering the UI)
}

function applyFilter(derivatives, type){
  return derivatives.filter((x) => {
    return x.get('type') == type
  })
}

function applyLegalEntityFilter(derivatives, legalEntity) {
  return derivatives.reduce((listX, x) => {
    let list = x.get('marginStatus').reduce((listY, y) => {
      let list = y.get('timeFrames').reduce((listZ, z) => {
        let list = z.get('actionsList').filter((a) => {
          return a.get('legalEntity') == legalEntity
        })
        return (list.size > 0 ? listZ.push(z.set('actionsList', list)) : listZ)
      }, List())
      return (list.size > 0 ? listY.push(y.set('timeFrames', list)) : listY)
    }, List())
    return (list.size > 0 ? listX.push(x.set('marginStatus', list)) : listX)
  }, List())
}

function applyStatusFilter(derivatives, status) {
  return derivatives.reduce((list, x) => {
    let listX = x.get('marginStatus').filter((y) => {
      return y.get('status') == status
    })
    return (listX.size > 0 ? list.push(x.set('marginStatus', listX)) : list)
  }, List())
}


function applyCptyOrgFilter(derivatives, cptyOrg) {
  return derivatives.reduce((listVenue, deriv) => {
    let venueList = deriv.get('marginStatus').reduce((listVenue, marginStatus) => {
      let venueList = marginStatus.get('timeFrames').reduce((listVenue, timeFrames) => {
        let venueList = timeFrames.get('actionsList').filter((actionsList) => {
          return actionsList.get('cptyOrg') == cptyOrg
        })
        return (venueList.size > 0 ? listVenue.push(timeFrames.set('actionsList', venueList)) : listVenue)
      }, List())
      return (venueList.size > 0 ? listVenue.push(marginStatus.set('timeFrames', venueList)) : listVenue)
    }, List())
    return (venueList.size > 0 ? listVenue.push(deriv.set('marginStatus', venueList)) : listVenue)
  }, List())

}

function applyCPTYFilter(derivatives, cptyEntity) {
  return derivatives.reduce((listCPTY, deriv)=>{
    let cptyList = deriv.get('marginStatus').reduce((listCPTY, marginStatus)=>{
      let cptyList = marginStatus.get('timeFrames').reduce((listCPTY, timeFrames)=>{
        let cptyList = timeFrames.get('actionsList').filter((actionsList)=>{

          return actionsList.get('cptyEntity')==cptyEntity
          })
        return (cptyList.size >0 ? listCPTY.push(timeFrames.set('actionsList', cptyList)) : listCPTY)
        }, List())
        return (cptyList.size >0 ? listCPTY.push(marginStatus.set('timeFrames', cptyList)) : listCPTY)
      }, List())
        return (cptyList.size >0 ? listCPTY.push(deriv.set('marginStatus', cptyList)) : listCPTY)
    }, List())
}


//update state
export function updateStateDeriv(state, action, store){
  if(action.get('filter') == "All"){
    return state.set('display',state.get(store))
  }else
    return state.setIn(['display', 'derivatives'], applyFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function updateStateLegal(state, action, store){
  if(action.get('filter') == "All"){
    return state.set('display', state.get(store))
  }else
    return state.setIn(['display','derivatives'], applyLegalEntityFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function updateStateStatus(state, action, store) {
  //console.log(state.toJS())
  if (action.get('filter') == "All") {
    return state.set('display', state.get(store))
  } else
    return state.setIn(['display', 'derivatives'], applyStatusFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function updateStateCptyOrg(state, action, store){
  if(action.get('filter') == "All"){
    return state.set('display', state.get(store))
  }else
    return state.setIn(['display','derivatives'], applyCptyOrgFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function updateStateCptyEntity(state, action, store) {
  if(action.get('filter') == "All"){
    return state.set('display', state.get(store))
  }else
    return state.setIn(['display','derivatives'], applyCPTYFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function multifilters(state, action){
  //console.log(attachFilter(state, action).toJS())
  return attachFilter(state, action).getIn(['inputs', 'filters']).reduce((newState, filter) => {
    switch(filter.get('type')){
      case 'FILTER_STATE_DERIV':
        return updateStateDeriv(newState, filter, 'display')

      case 'FILTER_STATE_LEGAL':
        return updateStateLegal(newState, filter, 'display')

      case 'FILTER_STATE_STATUS':
        return updateStateStatus(newState, filter, 'display')

      case 'FILTER_STATE_CPTYORG':
        return updateStateCptyOrg(newState, filter, 'display')

      case 'FILTER_STATE_CPTYENTITY':
        return updateStateCptyEntity(newState, filter, 'display')
    }
  }, attachFilter(initState(state, state.get('data')), action))

}

export function attachFilter(state, action){
  switch(action.type){
    case 'FILTER_STATE_DERIV':
      return state.setIn(['inputs','filters','typeFilter'], fromJS(action))
    case 'FILTER_STATE_LEGAL':
      return state.setIn(['inputs','filters','legalEntityFilter'], fromJS(action))

    case 'FILTER_STATE_STATUS':
      return state.setIn(['inputs','filters','statusFilter'], fromJS(action))

    case 'FILTER_STATE_CPTYORG':
      return state.setIn(['inputs','filters','cptyOrgFilter'], fromJS(action))

    case 'FILTER_STATE_CPTYENTITY':
      return state.setIn(['inputs','filters','cptyEntityFilter'], fromJS(action))
  }
}

export default function reducer(state = Map(), action, store = 'data') {
  switch(action.type) {
    case 'INIT_STATE':
      return initState(state, action.state)

    case 'FILTER_STATE_DERIV':
      return multifilters(state, action, store)

    case 'FILTER_STATE_LEGAL':
      return multifilters(state, action, store)

    case 'FILTER_STATE_STATUS':
      return multifilters(state, action, store)

    case 'FILTER_STATE_CPTYORG':
      return multifilters(state, action, store)

    case 'FILTER_STATE_CPTYENTITY':
      return multifilters(state, action, store)

  }

  return state
}
