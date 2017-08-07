import { delay } from 'redux-saga'
import { fork, call, put, take, race } from 'redux-saga/effects'

//fetches
import { checkSpecificServer } from './CheckServerConnectivitySaga'
import { FetchNavbarAlerts } from './FetchNavbarAlertsSaga'
import { ReconItemSaga } from './ReconItemSaga'
import { ReconDisputeSaga } from './ReconDisputeSaga'
import { FetchDeparturesSaga } from './FetchDeparturesSaga'
import { RequestValuationSaga } from './RequestValuationSaga'
import { GenerateMarginCallSaga } from './GenerateMarginCallSaga'
import { FetchDashboardSaga } from './FetchDashboardSaga'
import { FetchReconSaga } from './FetchReconSaga'
import { FetchOptimisationSettingsSaga } from './FetchOptimisationSettingsSaga'

//actions
import {
  updateNavbarAlerts,
  sagaNavbarAlerts
} from './../actions/CommonActions'
import {
  reconInitState,
  initState,
  initCurrencyInfo,
  initOptimisationSettings
} from './../actions'
import { initDepartures } from './../actions/DeployedActions'
import {
  updateRequestState,
  marginCallGenerated
} from './../actions/MarginCallUploadActions'

//action types
import {
  SAGA_NAVBAR_ALERTS,
  RECON_ITEM,
  RECON_DISPUTE_SUBMIT,
  FETCH_DEPARTURES,
  ON_REQUEST_VALUATION,
  ON_REQUEST_GENERATE_MARGINCALL,
  ON_INIT_DASHBOARD,
  ON_INIT_RECON,
  ON_FETCH_OPTIMISATION_SETTINGS
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
      // console.log(action.GUID)
      const result = yield call(ReconItemSaga, action.GUID)
      // console.log(result)
      yield put(reconInitState(result.items))
      yield put(sagaNavbarAlerts())
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* onReconDispute() {
  while(true){
    try{
      const action = yield take(RECON_DISPUTE_SUBMIT)
      // console.log(action)
      const items = yield call(ReconDisputeSaga, action.disputeObj)
      // console.log(result)
      yield put(reconInitState(items))
      yield put(sagaNavbarAlerts())
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* onFetchDepatures() {
  while(true){
    try{
      yield take(FETCH_DEPARTURES)
      const obj = yield call(FetchDeparturesSaga)
      if(obj.length)
        yield put(initDepartures(obj))
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* onRequestValuation() {
  while(true){
    try{
      const action = yield take(ON_REQUEST_VALUATION)
      // console.log(action)
      const obj = yield call(RequestValuationSaga, action.referenceIDs)
      console.log(obj)
      yield put(marginCallGenerated(obj))
      yield put(updateRequestState(false))
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* onGenerateMarginCalls() {
  while(true){
    try{
      const action = yield take(ON_REQUEST_GENERATE_MARGINCALL)
      // console.log(action)
      const obj = yield call(GenerateMarginCallSaga, action.referenceIDs)
      console.log(obj)
      yield put(marginCallGenerated(obj))
      yield put(updateRequestState(false))
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* onFetchDashboardData() {
  while(true){
    try{
      yield take(ON_INIT_DASHBOARD)
      const obj = yield call(FetchDashboardSaga)
      yield put(initState(obj))
    } catch(error) {
      console.log(error)
      return false
    }
  }
}

function* onFetchReconSaga() {
  while(true){
    try{
      yield take(ON_INIT_RECON)
      const {items, currencyInfo} = yield call(FetchReconSaga)
      yield put(reconInitState(items))
      yield put(initCurrencyInfo(currencyInfo))
    } catch(error) {
      console.log(error)
      return false
    }
  }
}

function* onFetchOptimisationSettings() {
  while(true){
    try{
      yield take(ON_FETCH_OPTIMISATION_SETTINGS)
      const payload = yield call(FetchOptimisationSettingsSaga)
      yield put(initOptimisationSettings(payload.items))
    }catch(error) {
      console.log(error)
      return false
    }
  }
}

export default function* root() {
  yield [
    fork(serverHealthChecks),
    fork(navbarAlerts),
    fork(onReconcile),
    fork(onReconDispute),
    fork(onFetchDepatures),
    fork(onRequestValuation),
    fork(onGenerateMarginCalls),
    fork(onFetchDashboardData),
    fork(onFetchReconSaga),
    fork(onFetchOptimisationSettings)
  ]
}
