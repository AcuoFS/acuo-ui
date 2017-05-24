import { delay } from 'redux-saga'
import { fork, call, put, take, race } from 'redux-saga/effects'

import { FetchMarginCall } from './FetchMarginCall'
import { checkServerConnectivity } from './CheckServerConnectivity'
import { pollMarginCall } from '../actions/MarginCallUploadActions'
import {
  POLL_MARGIN_CALL,
  STOP_MARGIN_POLL
} from '../constants/ActionTypes'
import { getMarginCallUpload } from  '../actions/MarginCallUploadActions'

import Notifications from 'react-notification-system-redux'

let serverStatus = {
  proxy: 'up'
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


function* serverHealthChecks() {
  while(true){
    try{
      // console.log('server check start')
      const result = yield call(checkServerConnectivity)
      // console.log(result)
      if(result === 'failed'){
        yield put(Notifications.error({
          title: 'Warning',
          message: 'Lost connectivity with proxy server',
          position: 'tr',
          uid: 'proxy',
          autoDismiss: 0
        }))
        serverStatus.proxy = 'down'
      }else if(result === 'passed'){
        if(serverStatus.proxy === 'down'){
          yield put(Notifications.success({
            title: 'Reconnected',
            message: 'Connectivity with proxy server has been restored',
            position: 'tr',
            uid: 'proxySuccess',
            autoDismiss: 0
          }))
          serverStatus.proxy = 'up'
        }
      }

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