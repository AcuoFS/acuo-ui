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

      return derivatives.reduce((listLegalEntity, deriv) => {
          console.log(deriv.get('marginStatus'))
          let legalEntityList = deriv.get('marginStatus').reduce((listLegalEntity, marginStatus) => {
              let legalEntityList = marginStatus.get('timeFrames').reduce((listLegalEntity, timeFrames) => {
                  let legalEntityList = timeFrames.get('actionsList').filter((actionsList) => {
                      return actionsList.get('legalEntity') == legalEntity
                  })
                  return (legalEntityList.size > 0 ? listLegalEntity.push(timeFrames.set('actionsList', legalEntityList)) : listLegalEntity)
              }, List())
              return (legalEntityList.size > 0 ? listLegalEntity.push(marginStatus.set('timeFrames', legalEntityList)) : listLegalEntity)
          }, List())
          return (legalEntityList.size > 0 ? listLegalEntity.push(deriv.set('marginStatus', legalEntityList)) : listLegalEntity)
      }, List())

}

export function updateStateDeriv(state, type){console.log('update', type)
    if(type=="All"){
        return state.set('display',state.get('data'))
    }else
        return state.setIn(['inputs', 'filters', 'typeFilter'], type).setIn(['display', 'derivatives'], applyFilter(state.getIn(['data', 'derivatives']), type))
}

export function updateStateLegal(state,legalEntityType){
    console.log('legalEntity :', legalEntityType)
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