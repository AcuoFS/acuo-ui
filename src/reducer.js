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

export default function reducer(state = Map(), action) {

    switch(action.type){
        case 'INIT_STATE':
            return initState(state, action.state)

        case 'FILTER_STATE_DERIV':
            return updateStateDeriv(state, action.filter)

        case 'FILTER_STATE_LEGAL':
            return updateStateLegal(state, action.filter)
    }

  return state
}