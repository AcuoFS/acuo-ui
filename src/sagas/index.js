import { delay } from 'redux-saga'
import { fork, call, put, take, race } from 'redux-saga/effects'

//fetches
import { checkSpecificServer } from './CheckServerConnectivitySaga'
import { FetchNavbarAlerts } from './FetchNavbarAlertsSaga'
import { ReconItemSaga } from './ReconItemSaga'

//actions
import {
  updateNavbarAlerts,
  sagaNavbarAlerts
} from './../actions/CommonActions'
import { reconInitState } from './../actions'

//action types
import {
  SAGA_NAVBAR_ALERTS,
  RECON_ITEM
} from '../constants/ActionTypes'

function* serverHealthChecks() {
  while(true){
    try{
      yield call(delay, 4000)
      console.groupCollapsed("Server Health Checks")
      yield checkSpecificServer('Proxy')
      yield checkSpecificServer('Margin')
      yield checkSpecificServer('Valuation')
      yield checkSpecificServer('Collateral')
      console.groupEnd("server Health Checks")
      yield call(delay, 16000)
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

function* navbarAlerts() {
  while(true){
    try{
      yield take(SAGA_NAVBAR_ALERTS)
      const alerts = yield call(FetchNavbarAlerts)
      yield put(updateNavbarAlerts(alerts))
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* onReconcile() {
  while(true){
    try{
      const action = yield take(RECON_ITEM)
      console.log(action.GUID)
      const result = yield call(ReconItemSaga, action.GUID)
      console.log(result)
      yield put(reconInitState(result.items))
      yield put(sagaNavbarAlerts())
    } catch(error){
      console.log(error)
      return false
    }
  }
}

export default function* root() {
  // console.log('root')
  yield [
    fork(serverHealthChecks),
    fork(navbarAlerts),
    fork(onReconcile)
  ]
}
