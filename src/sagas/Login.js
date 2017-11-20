// /**
//  * Created by Rui on 28/6/17.
//  */
// import { call, put } from 'redux-saga/effects'
// import { delay } from 'redux-saga'
//
// import { updateLoginProcess } from './../actions/LoginActions'
// import { DoLoginSaga } from './ServerCalls'
//
// export function* login(action) {
//   const { user, pass } = action
//   if(user && pass){
//     yield put(updateLoginProcess(true))
//     const clientID = yield call(DoLoginSaga(user, pass))
//     console.log(clientID)
//     //yield put(updateLoginProcess(false))
//     //localStorage.authenticating = true
//     //hashHistory.push('/2fa')
//   }
// }