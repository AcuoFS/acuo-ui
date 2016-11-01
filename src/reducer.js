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
         let listX = x.get('marginStatus').filter((y) => y.get('status') == status)
         return (listX.size > 0 ? list.push(x.set('marginStatus', listX)) : list)
    }, List())
}



function applyVenueFilter(derivatives, venue) {

    return derivatives.reduce((listVenue, deriv) => {
        console.log(deriv.get('marginStatus'))
        let venueList = deriv.get('marginStatus').reduce((listVenue, marginStatus) => {
            let venueList = marginStatus.get('timeFrames').reduce((listVenue, timeFrames) => {
                let venueList = timeFrames.get('actionsList').filter((actionsList) => {
                    return actionsList.get('venue') == venue
                })
                return (venueList.size > 0 ? listVenue.push(timeFrames.set('actionsList', venueList)) : listVenue)
            }, List())
            return (venueList.size > 0 ? listVenue.push(marginStatus.set('timeFrames', venueList)) : listVenue)
        }, List())
        return (venueList.size > 0 ? listVenue.push(deriv.set('marginStatus', venueList)) : listVenue)
    }, List())

}

export function updateStateDeriv(state, type){
    if(type=="All"){
        return state.set('display',state.get('data'))
    }else
        return state.setIn(['inputs', 'filters', 'typeFilter'], type).setIn(['display', 'derivatives'], applyFilter(state.getIn(['data', 'derivatives']), type))
}

export function updateStateLegal(state,legalEntityType){
    if(legalEntityType=="All"){
        return state.set('display', state.get('data'))
    }else
        return state.setIn(['inputs','filters','legalEntityFilter'],legalEntityType).setIn(['display','derivatives'],
        applyLegalEntityFilter(state.getIn(['data', 'derivatives']), legalEntityType))
}

export function updateStateStatus(state,statusType) {
  console.log('status :', statusType)
  if (statusType == "All") {
    return state.set('display', state.get('data'))
  } else
    return state.setIn(['inputs', 'filters', 'statusFilter'], statusType).setIn(['display', 'derivatives'],
      applyStatusFilter(state.getIn(['data', 'derivatives']), statusType))
}

export function updateStateVenue(state, venue){
    console.log('venue :', venue)
    if(venue=="All"){
        return state.set('display', state.get('data'))
    }else
        return state.setIn(['inputs','filters','legalEntityFilter'],venue).setIn(['display','derivatives'],
            applyVenueFilter(state.getIn(['data', 'derivatives']), venue))

}

export default function reducer(state = Map(), action) {

    switch(action.type){
        case 'INIT_STATE':
            return initState(state, action.state)

        case 'FILTER_STATE_DERIV':
            return updateStateDeriv(state, action.filter)

        case 'FILTER_STATE_LEGAL':
            return updateStateLegal(state, action.filter)

        case 'FILTER_STATE_STATUS':
            return updateStateStatus(state, action.filter)
        case 'FILTER_STATE_VENUE':
                return updateStateVenue(state, action.filter)
    }

  return state
}