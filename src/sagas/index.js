import { delay } from 'redux-saga'
import { fork, call, put, take, race } from 'redux-saga/effects'

import { FetchMarginCall } from './FetchMarginCall'
import { pollMarginCall } from '../actions/MarginCallUploadActions'
import {
  POLL_MARGIN_CALL,
  STOP_MARGIN_POLL
} from '../constants/ActionTypes'
import { getMarginCallUpload } from  '../actions/MarginCallUploadActions'


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

export default function* root() {
  // console.log('root')
  yield [
    fork(watchMarginCall)
  ]
}