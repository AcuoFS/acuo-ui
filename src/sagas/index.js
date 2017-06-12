import { delay } from 'redux-saga'
import { fork, call, put, take, race } from 'redux-saga/effects'

//fetches
import { FetchMarginCall } from './FetchMarginCall'
import {
  checkSpecificServer
} from './CheckServerConnectivity'
import { FetchNavbarAlerts } from './FetchNavbarAlerts'

//actions
import { getMarginCallUpload } from  '../actions/MarginCallUploadActions'
import { pollMarginCall } from '../actions/MarginCallUploadActions'
import { updateNavbarAlerts } from './../actions/CommonActions'

//action types
import {
  POLL_MARGIN_CALL,
  STOP_MARGIN_POLL,
  SAGA_NAVBAR_ALERTS
} from '../constants/ActionTypes'

function* poll(txnID) {
  // console.log('poll')
  try {
    yield call(delay, 10000)
    const result = yield call(FetchMarginCall, txnID)

    // console.log(result)

    if(result[0] === 'failed')
      yield put(pollMarginCall(txnID))
    else
      yield put(getMarginCallUpload(result[1]))


  } catch (error) {
    // cancellation error -- can handle this if you wish
    return
  }
}

function* watchMarginCall() {
  // console.log('watch margin call')
  while (true) {
    const { txnID } = yield take(POLL_MARGIN_CALL)
    yield race([
      fork(poll, txnID),
      take(STOP_MARGIN_POLL)
    ])
    // console.log('loop')
  }
}

function* serverHealthChecks() {
  while(true){
    try{
      yield call(delay, 4000)
      yield checkSpecificServer('Proxy')
      yield checkSpecificServer('Margin')
      yield checkSpecificServer('Valuation')
      yield checkSpecificServer('Collateral')

      yield call(delay, 16000)
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

function* sagaNavbarAlerts() {
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

export default function* root() {
  // console.log('root')
  yield [
    fork(watchMarginCall),
    fork(serverHealthChecks),
    fork(sagaNavbarAlerts)
  ]
}
