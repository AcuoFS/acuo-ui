import { delay } from 'redux-saga'
import { fork, call, put, take, race } from 'redux-saga/effects'

import { FetchMarginCall } from './FetchMarginCall'
import {
  checkProxyServerConnectivity,
  checkMarginServerConnectivity,
  checkValuationServerConnectivity,
  checkCollateralServerConnectivity
} from './CheckServerConnectivity'
import { pollMarginCall } from '../actions/MarginCallUploadActions'
import {
  POLL_MARGIN_CALL,
  STOP_MARGIN_POLL
} from '../constants/ActionTypes'
import { getMarginCallUpload } from  '../actions/MarginCallUploadActions'

import Notifications from 'react-notification-system-redux'

let serverStatus = {
  proxy: 'up',
  margin: 'up',
  valuation: 'up',
  collateral: 'up'
}

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

function* checkSpecificServer(server, failMsg, uid, successMsg) {
  const result = yield call(server)
  if (result === 'failed') {
    yield put(Notifications.error({
      title: 'Warning',
      message: failMsg,
      position: 'tr',
      uid: uid,
      autoDismiss: 0
    }))
    serverStatus[uid] = 'down'
  } else if (result === 'passed') {
    if (serverStatus[uid] === 'down') {
      yield put(Notifications.success({
        title: 'Reconnected',
        message: successMsg,
        position: 'tr',
        uid: uid + 'Success',
        autoDismiss: 0
      }))
      serverStatus[uid] = 'up'
    }
  }
}

function* serverHealthChecks() {
  while(true){
    try{
      // console.log('server check start')
      yield checkSpecificServer(checkProxyServerConnectivity, 'Lost connectivity to Proxy server', 'proxy', 'Reconnected with proxy server')
      yield checkSpecificServer(checkMarginServerConnectivity, 'Lost connectivity to Margin server', 'margin', 'Reconnected with Margin server')
      yield checkSpecificServer(checkValuationServerConnectivity, 'Lost connectivity to Valuation server', 'valuation', 'Reconnected with Valuation server')
      yield checkSpecificServer(checkCollateralServerConnectivity, 'Lost connectivity to Collateral server', 'collateral', 'Reconnected with Collateral server')

      yield call(delay, 10000)
      // console.log('after pause')
      // console.log('end cycle')
    } catch (error) {
      // cancellation error -- can handle this if you wish
      // console.log('cancelled, not the right place to go')
      return false
    }
  }
}

export default function* root() {
  // console.log('root')
  yield [
    fork(watchMarginCall),
    fork(serverHealthChecks)
  ]
}