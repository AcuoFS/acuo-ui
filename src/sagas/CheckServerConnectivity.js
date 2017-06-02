import {
  PROXY_HEALTH_CHECK,
  MARGIN_HEALTH_CHECK,
  VALUATION_HEALTH_CHECK,
  COLLATERAL_HEALTH_CHECK
} from './../constants/APIcalls'

import { call, put } from 'redux-saga/effects'

import Notifications from 'react-notification-system-redux'

let serverStatus = {
  proxy: 'up',
  margin: 'up',
  valuation: 'up',
  collateral: 'up'
}

const checkProxyServerConnectivity = () => {
  return fetch(PROXY_HEALTH_CHECK).then(response => {
    return 'passed'
  }, error => {
    return 'failed'
  })
}

const checkMarginServerConnectivity = () => {
  return fetch(MARGIN_HEALTH_CHECK).then(response => {
    return 'passed'
  }, error => {
    return 'failed'
  })
}

const checkValuationServerConnectivity = () => {
  return fetch(VALUATION_HEALTH_CHECK).then(response => {
    return 'passed'
  }, error => {
    return 'failed'
  })
}

const checkCollateralServerConnectivity = () => {
  return fetch(COLLATERAL_HEALTH_CHECK).then(response => {
    return 'passed'
  }, error => {
    return 'failed'
  })
}

const mapping = (uid) => {
  switch(uid){
    case 'Proxy':
      return checkProxyServerConnectivity
    case 'Margin':
      return checkMarginServerConnectivity
    case 'Valuation':
      return checkValuationServerConnectivity
    case 'Collateral':
      return checkCollateralServerConnectivity
  }
}

export function* checkSpecificServer(uid) {
  const result = yield call(mapping(uid))
  if (result === 'failed') {
    yield put(Notifications.error({
      title: 'Warning',
      message: `Lost connectivity to ${uid} server.`,
      position: 'tr',
      uid: uid,
      autoDismiss: 0
    }))
    serverStatus[uid] = 'down'
  } else if (result === 'passed') {
    if (serverStatus[uid] === 'down') {
      yield put(Notifications.success({
        title: 'Reconnected',
        message: `Reestablished connectivity to ${uid} server.`,
        position: 'tr',
        uid: uid + 'Success',
        autoDismiss: 0
      }))
      serverStatus[uid] = 'up'
    }
  }
}