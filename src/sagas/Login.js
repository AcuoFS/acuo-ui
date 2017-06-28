/**
 * Created by Rui on 28/6/17.
 */
import { updateLoginProcess } from './../actions/LoginActions'

import { call, put } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import { delay } from 'redux-saga'

export function* login(action) {
  const { user, pass } = action
  if(user && pass){
    yield put(updateLoginProcess(true))
    yield delay(4000) //simulating login
    yield put(updateLoginProcess(false))
    localStorage.authenticating = true
    hashHistory.push('/2fa')
  }
}