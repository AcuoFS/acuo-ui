import { fork, call, put, take, race, takeLatest } from 'redux-saga/effects'
import { delay, takeEvery } from 'redux-saga'
import { hashHistory } from 'react-router'
import Notifications from 'react-notification-system-redux'

//fetches
import {
  checkSpecificServer,
  FetchNavbarAlerts,
  ReconItemSaga,
  ReconDisputeSaga,
  FetchDeparturesSaga,
  RequestValuationSaga,
  GenerateMarginCallSaga,
  FetchDashboardSaga,
  FetchReconSaga,
  FetchOptimisationSettingsSaga,
  FetchSelectionSaga,
  AllocateCollateralsSaga,
  FetchCollateralsSaga,
  PostPledgeSaga,
  RemoveAllocatedAssetsSaga,
  DoLoginSaga,
  PostMarginCallsSaga,
  FetchCurrencyInfoSaga,
  FetchDeployedOptimisationSettingsSaga,

  FetchAnalyticsDataSaga
} from './ServerCalls'

//actions
import {
  updateNavbarAlerts,
  sagaNavbarAlerts
} from './../actions/CommonActions'
import {
  reconInitState,
  initState,
  initCurrencyInfo,
  initOptimisationSettings,
  initSelection,
  updateCollateral,
  fetchCollaterals,
  fetchSelection,
  clearPendingAllocation,
  allocatingCollaterals
} from './../actions'
import {
  initDepartures,
  initDeployedOptimisationSettings
} from './../actions/DeployedActions'
import {
  updateRequestState,
  marginCallGenerated,
  onMarginCallSendSuccess
} from './../actions/MarginCallUploadActions'
import {
  updateLoginProcess,
  updateWrongCredentialsFlag
} from './../actions/LoginActions'

import {
  updateAnalyticsData
} from './../actions/AnalyticsActions'

import{
  updateCurrencyInfo
} from './../actions/CommonActions'

//action types
import {
  DO_LOGIN,
  SAGA_NAVBAR_ALERTS,
  RECON_ITEM,
  RECON_DISPUTE_SUBMIT,
  FETCH_DEPARTURES,
  ON_REQUEST_VALUATION,
  ON_REQUEST_GENERATE_MARGINCALL,
  ON_INIT_DASHBOARD,
  ON_INIT_RECON,
  ON_FETCH_OPTIMISATION_SETTINGS,
  ON_FETCH_SELECTION,
  ON_ALLOCATE_COLLATERALS,
  ON_FETCH_COLLATERALS,
  ON_PLEDGE,
  ON_REMOVE_ALLOCATED_ASSET,
  ON_REQUEST_SEND_MARGINCALL,
  SAGA_ANALYTICS_DATA,
  ON_INIT_DEPLOYED_OPTIMISATION_SETTINGS
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


function* watchLogin() {
  // yield takeLatest(DO_LOGIN, login)
  while (true) {
    try {
      const action = yield take(DO_LOGIN)
      const {user, pass} = action
      if (user && pass) {
        yield put(updateLoginProcess(true))
        yield put(updateWrongCredentialsFlag(false))
        const { clientID } = yield call(DoLoginSaga, user, pass)
        if(clientID) {
          localStorage.authenticating = true
          hashHistory.push('/2fa')
        }else{
          yield put(updateWrongCredentialsFlag(true))
          // yield put(Notifications.error({
          //   title: 'Warning',
          //   message: `Login failed, please check your credentials`,
          //   position: 'tr',
          //   autoDismiss: 3
          // }))
          // no toastr for failed login
        }
        yield put(updateLoginProcess(false))
      }
    }
    catch
      (error) {
      console.log(error)
      return false
    }
  }
}


function* watchReconcile() {
  while(true){
    try{
      const action = yield take(RECON_ITEM)
      const result = yield call(ReconItemSaga, action.GUID)
      yield put(reconInitState(result.items))
      yield put(sagaNavbarAlerts())
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* watchReconDispute() {
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

function* watchFetchDepatures() {
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

function* watchFetchDeployedOptimisationSettings() {
  while(true){
    try{
      yield take(ON_INIT_DEPLOYED_OPTIMISATION_SETTINGS)
      const obj = yield call(FetchDeployedOptimisationSettingsSaga)
      yield put(initDeployedOptimisationSettings(obj.items))
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* watchRequestValuation() {
  while(true){
    try{
      const action = yield take(ON_REQUEST_VALUATION)
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

function* watchGenerateMarginCalls() {
  while(true){
    try{
      const action = yield take(ON_REQUEST_GENERATE_MARGINCALL)
      const obj = yield call(GenerateMarginCallSaga, action.referenceIDs)
      // console.log(obj)
      yield put(marginCallGenerated(obj))
      yield put(updateRequestState(false))
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* watchSendMarginCalls() {
  while(true){
    try{
      const action = yield take(ON_REQUEST_SEND_MARGINCALL)
      const obj = yield call(PostMarginCallsSaga, action.referenceIDs)
      // console.log(obj)
      yield put(onMarginCallSendSuccess(obj))
      yield put(updateRequestState(false))
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* watchFetchDashboardData() {
  while(true){
    try{
      yield take(ON_INIT_DASHBOARD)
      const obj = yield call(FetchDashboardSaga)
      yield put(initState(obj))
      const currencyObj = yield call(FetchCurrencyInfoSaga)
      yield put(updateCurrencyInfo(currencyObj))
    } catch(error) {
      console.log(error)
      return false
    }
  }
}

function* watchFetchReconSaga() {
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

function* watchFetchOptimisationSettings() {
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

function* watchFetchSelection() {
  while (true) {
    try {
      yield take(ON_FETCH_SELECTION)
      const payload = yield call(FetchSelectionSaga)
      yield put(initSelection(payload.items))
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

function* watchAllocateCollaterals() {
  while (true) {
    try {
      const { obj } = yield take(ON_ALLOCATE_COLLATERALS)
      yield put(allocatingCollaterals(true))
      const payload = yield call(AllocateCollateralsSaga, obj)
      yield put(initSelection(payload.items))
      yield put(fetchCollaterals())
      yield put(allocatingCollaterals(false))
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

function* watchFetchCollaterals() {
  while (true) {
    try {
      yield take(ON_FETCH_COLLATERALS)
      const payload = yield call(FetchCollateralsSaga)
      yield put(updateCollateral(payload.items))
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

function* watchPledge() {
  while(true){
    try{
      const action = yield take(ON_PLEDGE)
      yield call(PostPledgeSaga, action.pledgeToSend)
      yield put(fetchSelection())
      yield put(clearPendingAllocation())
      yield put(sagaNavbarAlerts())
      yield put(fetchCollaterals())
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* watchRemoveAllocatedAsset() {
  while(true){
    try{
      const action = yield take(ON_REMOVE_ALLOCATED_ASSET)
      const json = yield call(RemoveAllocatedAssetsSaga, action.obj)
      yield put(initSelection(json.items))
      yield put(fetchCollaterals())
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* watchFetchAnalyticsData() {
  while(true){
    try{
      yield take(SAGA_ANALYTICS_DATA)
      const json = yield call(FetchAnalyticsDataSaga)
      // console.log(json)
      yield put(updateAnalyticsData(json))
    } catch(error){
      console.log(error)
      return false
    }
  }
}

export default function* root() {
  yield [
    fork(serverHealthChecks),
    fork(sagaNavbarAlerts),
    fork(watchLogin),
    fork(navbarAlerts),
    fork(watchReconcile),
    fork(watchReconDispute),
    fork(watchFetchDepatures),
    fork(watchRequestValuation),
    fork(watchGenerateMarginCalls),
    fork(watchSendMarginCalls),
    fork(watchFetchDashboardData),
    fork(watchFetchReconSaga),
    fork(watchFetchOptimisationSettings),
    fork(watchFetchSelection),
    fork(watchAllocateCollaterals),
    fork(watchFetchCollaterals),
    fork(watchPledge),
    fork(watchRemoveAllocatedAsset),
    fork(watchFetchDeployedOptimisationSettings),
    fork(watchFetchAnalyticsData)
  ]
}
