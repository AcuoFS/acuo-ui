import {
  PROXY_HEALTH_CHECK,
  MARGIN_HEALTH_CHECK,
  VALUATION_HEALTH_CHECK,
  COLLATERAL_HEALTH_CHECK
} from '../../constants/APIcalls'

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
    if(response.status === 200){
     // console.log("checkProxyServerConnectivity ::: Response Evaluation:" , true , "@", new Date());
     return 'passed'
    }
    else {
     console.log("checkProxyServerConnectivity ::: Response Evaluation:" , false , "@", new Date());
     return 'failed'
    }
  }, error => {
    console.error("checkProxyServerConnectivity ::: Response Error!" , new Date() , error);
    return 'failed'
  })
}

const checkMarginServerConnectivity = () => {
  return fetch(MARGIN_HEALTH_CHECK).then(response => {

   if(response.status === 200){
    // console.log("checkMarginServerConnectivity ::: Response Evaluation:" , true , "@", new Date());
    return 'passed'
   }
   else {
    console.log("checkMarginServerConnectivity ::: Response Evaluation:" , false , "@", new Date());
    return 'failed'
   }
  }, error => {
    console.error("checkMarginServerConnectivity ::: Response Error!" , new Date());
    return 'failed'
  })
}

const checkValuationServerConnectivity = () => {
  return fetch(VALUATION_HEALTH_CHECK).then(response => {
   if(response.status === 200){
    // console.log("checkValuationServerConnectivity ::: Response Evaluation:" , true , "@", new Date());
    return 'passed'
   }
   else {
    console.log("checkValuationServerConnectivity ::: Response Evaluation:" , false , "@", new Date());
    return 'failed'
   }
  }, error => {
    console.error("checkValuationServerConnectivity ::: Response Error!" , new Date());
    return 'failed'
  })
}

const checkCollateralServerConnectivity = () => {
  return fetch(COLLATERAL_HEALTH_CHECK).then(response => {
   if(response.status === 200){
    // console.log("checkCollateralServerConnectivity ::: Response Evaluation:" , true , "@", new Date());
    return 'passed'
   }
   else {
    console.log("checkCollateralServerConnectivity ::: Response Evaluation:" , false , "@", new Date());
    return 'failed'
   }
  }, error => {
    console.error("checkCollateralServerConnectivity ::: Response Error!" , new Date());
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
      // yield put(Notifications.success({
      //   title: 'Reconnected',
      //   message: `Reestablished connectivity to ${uid} server.`,
      //   position: 'tr',
      //   uid: uid + 'Success',
      //   autoDismiss: 0
      // }))
      yield put(Notifications.hide(uid))
      serverStatus[uid] = 'up'
    }
  }
}
