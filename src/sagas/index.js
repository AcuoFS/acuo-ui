import { FetchMarginCall } from './FetchMarginCall'
import { delay } from 'redux-saga'
import { fork, call, put, take, race } from 'redux-saga/effects'

function* pollMarginCall() {
  try {
    yield call(delay, 20000)
    yield put(FetchMarginCall())
  } catch (error) {
    // cancellation error -- can handle this if you wish
  }
}

function* watchMarginCall() {
  while (true) {
    yield take('FETCH_MARGIN_CALL', pollMarginCall)
    yield race([
      call(pollMarginCall)
    ])
  }
}

export default function* root() {
  yield [
    fork(watchMarginCall)
  ]
}