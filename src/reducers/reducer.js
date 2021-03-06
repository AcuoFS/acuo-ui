import {Map, List, fromJS} from 'immutable'
import _ from 'lodash'

import { clearTime, getDate } from '../utils'
import * as ActionTypes from '../constants/ActionTypes'

const INITIAL_STATE = Map({
  "data": Map({
    "derivatives": List(),
    "menu": Map({
      "alerts": List()
    })
  }),
  "display": Map({
    "derivatives": List(),
    "menu": Map({
      "alerts": List()
    })
  }),
  "selectedCurrency": "USD"
})

export function initState(state = Map(), newJSON){

  let json = plusMinusThreeDays(newJSON) || []
  let lol = json
  if(state.getIn(['inputs', 'filters']) && !state.getIn(['inputs', 'filters']).isEmpty())
    lol = state.getIn(['inputs', 'filters']).reduce((json, x) => {
        switch(x.get('type')){
          case 'FILTER_STATE_DERIV':
            return updateStateDeriv(json, x, 'display')

          case 'FILTER_STATE_LEGAL':
            return updateStateLegal(json, x, 'display')

          case 'FILTER_STATE_STATUS':
            return updateStateStatus(json, x, 'display')

          case 'FILTER_STATE_TIMEWINDOW':
            return updateTimeWindow(json, x.get('timeRangeText'), x.get('minTime'), x.get('maxTime'), 'display')

          case 'FILTER_STATE_CPTYORG':
            return updateStateCptyOrg(json, x, 'display')

          case 'FILTER_STATE_CPTYENTITY':
            return updateStateCptyEntity(json, x, 'display')
        }
      }
      , fromJS({"display": json})).get('display').toJS()

  return state.withMutations((state) => state.set('data', fromJS(json)).set('display', fromJS(lol)))
  //pushed into two separate nodes, data(for retention of persistent data), display(for rendering the UI)
}

const plusMinusThreeDays = (json) => {

  const today = getDate()
  const thirtySixHrDuration = 36 * 60 * 60 * 1000
  const d = today
  const dPlusOne = new Date(d.getTime() + thirtySixHrDuration)
  const dMinusTwo = new Date(d.getTime() - thirtySixHrDuration)

  return {
    derivatives: _.map(json.derivatives, deriv => (
      _.set(deriv, 'marginStatus', _.map(deriv.marginStatus, status => (
        _.set(status, 'timeFrames', _.filter(status.timeFrames, timeFrame => (
          _.inRange((new Date(timeFrame.timeRangeStart)).getTime(), dMinusTwo.getTime(), dPlusOne.getTime())
        ))))
      ).filter(x => x.timeFrames.length)))).filter(x => x.marginStatus.length),
    menu: json.menu,
    timeUpdated: json.timeUpdated
  }

}

function applyFilter(derivatives, type){
  return derivatives.filter((x) => {
    return x.get('type') === type
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

function applyTimeWindowFilter(derivatives, minTime, maxTime){
  return derivatives.reduce((listX, x)=>{
    let list = x.get('marginStatus').reduce((listY, y) => {
      let list = y.get('timeFrames').filter((z)=>{
        let timeFrame = z.get('timeRangeStart')
        let timeFrameInMill = new Date(timeFrame).getTime()
            if((timeFrameInMill >= minTime) && (timeFrameInMill < maxTime))
               return true
      })
      return (list.size > 0 ? listY.push(y.set('timeFrames', list)) : listY)
    },List())
    return (list.size >0 ? listX.push(x.set('marginStatus', list)) : listX)
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

function applyCPTYFilter(derivatives, cptyEntityList) {
  return derivatives.reduce((listCPTY, deriv)=>{
    let cptyList = deriv.get('marginStatus').reduce((listCPTY, marginStatus)=>{
      let cptyList = marginStatus.get('timeFrames').reduce((listCPTY, timeFrames)=>{
        let cptyList = timeFrames.get('actionsList').filter((actionsList)=>{

          return fromJS(cptyEntityList).includes(actionsList.get('cptyEntity'))
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
    return state
  }else
    return state.setIn(['display', 'derivatives'], applyFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function updateStateLegal(state, action, store){
  if(action.get('filter') == "All"){
    return state
  }else
    return state.setIn(['display','derivatives'], applyLegalEntityFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function updateStateStatus(state, action, store) {
  if (action.get('filter') == "all") {
    return state
  } else
    return state.setIn(['display', 'derivatives'], applyStatusFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function updateTimeWindow(state, text, actionMin, actionMax , store){
  if(text.toLowerCase() === 'today: all'){
    return state
  }
  else if(text.toLowerCase() === 'yesterday: all'){
    return state
  }
  else if(text.toLowerCase() === 'tomorrow: all'){
    return state
  }
  else{
    return state.setIn(['display', 'derivatives'], applyTimeWindowFilter(state.getIn([store, 'derivatives']), actionMin, actionMax))
  }
}

export function updateStateCptyOrg(state, action, store){
  if(action.get('filter') == "All"){
    return state
  }else
    return state.setIn(['display','derivatives'], applyCptyOrgFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function updateStateCptyEntity(state, action, store) {
  if(action.get('filter').includes("All")){
    return state
  }else
    return state.setIn(['display','derivatives'], applyCPTYFilter(state.getIn([store, 'derivatives']), action.get('filter')))
}

export function multifilters(state, action){
  return attachFilter(state, action).getIn(['inputs', 'filters']).reduce((newState, filter) => {
    switch(filter.get('type')){
      case 'FILTER_STATE_DERIV':
        return updateStateDeriv(newState, filter, 'display')

      case 'FILTER_STATE_LEGAL':
        return updateStateLegal(newState, filter, 'display')

      case 'FILTER_STATE_STATUS':
        return updateStateStatus(newState, filter, 'display')

      case 'FILTER_STATE_TIMEWINDOW':
        return updateTimeWindow(newState, filter.get('timeRangeText'), filter.get('minTime'), filter.get('maxTime'), 'display')

      case 'FILTER_STATE_CPTYORG':
        return updateStateCptyOrg(newState, filter, 'display')

      case 'FILTER_STATE_CPTYENTITY':
        return updateStateCptyEntity(newState, filter, 'display')
    }
  }, attachFilter(state.set('display', state.get('data')), action))

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

    case 'FILTER_STATE_TIMEWINDOW':
      return state.setIn(['inputs','filters','timeWindowFilter'], fromJS(action))
  }
}

//updating state when recon page info is retrieved
export const appendList = (state, action) => {
  if(!state.get('data').isEmpty()){

    return state.setIn(['data', 'derivatives'], state.getIn(['data', 'derivatives']).map((x) =>{

      return x.set('marginStatus', x.get('marginStatus').map((y) => {
        return y.set('timeFrames', y.get('timeFrames').map((z) => {
          return z.set('actionsList', z.get('actionsList').map((a) => {
            let item = action.addition.filter((item) => {
              return a.get('GUID') === item.get('GUID')
            }).first()

            if(item) {
              return a.set('clientAssets', item.get('clientAssets')).set('counterpartyAssets', item.get('counterpartyAssets')).set('currencyInfo', item.get('currencyInfo'))
            }
            else {
              return a
            }
          }))
        }))
      }))
    })).setIn(['display', 'derivatives'], state.getIn(['display', 'derivatives']).map((x) =>{
      return x.set('marginStatus', x.get('marginStatus').map((y) => {
        return y.set('timeFrames', y.get('timeFrames').map((z) => {
          return z.set('actionsList', z.get('actionsList').map((a) => {
            let item = action.addition.filter((item) => {
              return a.get('GUID') === item.get('GUID')
            }).first()

            if(item) {
              return a.set('clientAssets', item.get('clientAssets')).set('counterpartyAssets', item.get('counterpartyAssets')).set('currencyInfo', item.get('currencyInfo'))
            }
            else {
              return a
            }
          }))
        }))
      }))
    }))
  }
  else{
    return state
  }

}

export const selectItem = (state, action) => {
  return state.setIn(['display', 'derivatives'], state.getIn(['display', 'derivatives']).map((x) => {
    return x.set('marginStatus', x.get('marginStatus').map((y) => {
      return y.set('timeFrames', y.get('timeFrames').map((z) => {
        return z.set('actionsList', z.get('actionsList').map((a) => {
          if(a.get('GUID') == action.GUID) {
            return a.set('clientAssets', a.get('clientAssets').map((b) => {
              return b.set('data', b.get('data').map((c) => {
                return c.set('secondLevel', c.get('secondLevel').map(d => {
                  if(d.get('id') == action.id){
                    if(!d.get('checked') && !d.get('recon'))
                      return d.set('checked', true)
                    else {
                      return d.set('checked', false)
                    }
                  }
                  else {
                    return d
                  }
                }))
              }))
            })).set('counterpartyAssets', a.get('counterpartyAssets').map((b) => {
              return b.set('data', b.get('data').map((c) => {
                return c.set('secondLevel', c.get('secondLevel').map(d => {
                  if(d.get('id') == action.id){
                    if(!d.get('checked') && !d.get('recon'))
                      return d.set('checked', true)
                    else {
                      return d.set('checked', false)
                    }
                  }
                  else {
                    return d
                  }
                }))
              }))
            }))
          }
          return a
        }))
      }))
    }))
  }))
}
export const reconItem = (state, action) => {
  return state.setIn(['display', 'derivatives'], state.getIn(['display', 'derivatives']).map((x) => {
    return x.set('marginStatus', x.get('marginStatus').map((y) => {
      return y.set('timeFrames', y.get('timeFrames').map((z) => {
        return z.set('actionsList', z.get('actionsList').map((a) =>{
          if(a.get('GUID'))
            return a.set('clientAssets', a.get('clientAssets').map((b) => {
              return b.set('data', b.get('data').map((c) => {
                return c.set('secondLevel', c.get('secondLevel').map(d => {
                  if(d.get('checked'))
                    return d.set('checked', false).set('recon', true)
                  else{
                    return d.set('checked', d.get('checked'))
                  }
                }))
              }))
            })).set('counterpartyAssets', a.get('counterpartyAssets').map((b) => {
              return b.set('data', b.get('data').map((c) => {
                return c.set('secondLevel', c.get('secondLevel').map(d => {
                  if(d.get('checked'))
                    return d.set('checked', false).set('recon', true)
                  else{
                    return d.set('checked', d.get('checked'))
                  }
                }))
              }))
            }))
          else{
            return a
          }
        }))
      }))
    }))
  }))
}


// main reducer function
export default function mainReducer(state = INITIAL_STATE, action, store = 'data') {

  switch(action.type) {
    case ActionTypes.INIT_STATE:
      return initState(state, action.state)

    case ActionTypes.FILTER_STATE_DERIV:
      return multifilters(state, action, store)

    case ActionTypes.FILTER_STATE_LEGAL:
      return multifilters(state, action, store)

    case ActionTypes.FILTER_STATE_TIMEWINDOW:
      return multifilters(state, action, store)

    case ActionTypes.FILTER_STATE_STATUS:
      return multifilters(state, action, store)

    case ActionTypes.FILTER_STATE_CPTYORG:
      return multifilters(state, action, store)

    case ActionTypes.FILTER_STATE_CPTYENTITY:
      return multifilters(state, action, store)

    case ActionTypes.LINE_ITEM_INSERTION:
      return appendList(state, action)

    case ActionTypes.SELECT_ITEM:
      return selectItem(state, action)

    case ActionTypes.UPDATE_SELECTED_CURRENCY:
      return state.set('selectedCurrency', action.currency)

    // case 'RECON_ITEM':
    //   return reconItem(state, action)
  }

  return state
}
