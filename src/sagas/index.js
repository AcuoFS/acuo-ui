import { fork, call, put, take, race, takeLatest, select } from 'redux-saga/effects'
import { delay, throttle } from 'redux-saga'
import { hashHistory } from 'react-router'
import Notifications from 'react-notification-system-redux'

//Sagas
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
  PostReplaceAllocatedAssetSaga,
  DeployedCalcAdjAmountSaga,
  DoLogoutSaga,

  FetchAnalyticsDataSaga, FetchAccessWithRefresh
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
  allocatingCollaterals,
  onInitDashboard,
  onInitReconState,
  refreshAllData
} from './../actions'
import {
  fetchDepartures,
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
  updateWrongCredentialsFlag,
  doLogout
} from './../actions/LoginActions'

import {
  updateAnalyticsData
} from './../actions/AnalyticsActions'

import{
  updateCurrencyInfo,
  setEmailAdd
} from './../actions/CommonActions'

import {
  AssetsPanel
} from './../actions/AssetsActions'

//action types
import {
  DO_LOGIN,
  DO_LOGOUT,
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
  ON_INIT_DEPLOYED_OPTIMISATION_SETTINGS,
  ON_REPLACE_ALLOCATED_ASSET,
  ON_CAL_ADJ_AMOUNT,
  REFRESH_ACCESS_TOKEN,
  REFRESH_ALL_DATA
} from '../constants/ActionTypes'

const getClientIDSelector = state => state.CommonReducer.get('clientId')

function* serverHealthChecks() {
  while(true){
    try{
      yield call(delay, 4000)
      // console.groupCollapsed("Server Health Checks")
      yield checkSpecificServer('Proxy')
      yield checkSpecificServer('Margin')
      yield checkSpecificServer('Valuation')
      yield checkSpecificServer('Collateral')
      // console.groupEnd("server Health Checks")
      yield call(delay, 16000)
      yield put(refreshAllData())
      yield call(delay, 40000)
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
      const { alerts } = yield call(FetchNavbarAlerts)
      // console.log(alerts)
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
        const { clientId } = yield call(DoLoginSaga, user, pass)
        if(clientId.clientId) {
          localStorage.authenticating = true
          hashHistory.push('/2fa')
          window.localStorage.clientId = clientId.clientId
          // yield put(setEmailAdd(clientId.email))
          window.localStorage.acuoEmail = clientId.email
          yield put(Notifications.hide(9999999999))
        }else{
          yield put(updateWrongCredentialsFlag(true))
        }
        yield put(updateLoginProcess(false))
      }
    }
    catch (error) {
      console.log(error)
      return false
    }
  }
}

function* watchLogout() {
  while(true){
    try {
      yield take(DO_LOGOUT)
      const { status } = yield call(DoLogoutSaga)
      window.localStorage.clear()
      hashHistory.push("/")

    } catch(error) {
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
      // yield put(reconInitState(result.items))
      yield put(refreshAllData())
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
      // yield put(reconInitState(items))
      yield put(refreshAllData())
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
      // console.log(obj)
      yield put(marginCallGenerated(obj))
      yield put(updateRequestState(false))
      yield put(refreshAllData())
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
      yield put(refreshAllData())
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
      yield put(refreshAllData())
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
      // const clientId = yield select(getClientIDSelector)
      // console.log(clientId)
      const obj = yield call(FetchDashboardSaga)
      // console.log(obj)
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
      const { items } = yield call(FetchOptimisationSettingsSaga)
      console.log(items)
      yield put(initOptimisationSettings(items))
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
      const { items } = yield call(FetchSelectionSaga)
      yield put(initSelection(items))
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
      // yield put(initSelection(payload.items))
      yield put(refreshAllData())
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
      yield put(refreshAllData())
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
      // yield put(initSelection(json.items))
      // yield put(fetchCollaterals())
      yield put(refreshAllData())
    } catch(error){
      console.log(error)
      return false
    }
  }
}

function* watchReplaceAllocatedAsset() {
  while(true){
    try{
      const action = yield take(ON_REPLACE_ALLOCATED_ASSET)
      console.log('fired')
      // yield call(PostReplaceAllocatedAssetSaga, action.obj)
    }catch(error){
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

function* runCalc(action){
  const json = yield call(DeployedCalcAdjAmountSaga)
  console.log(json)
}

function* watchDeployedPopupChangeAmount(){
  // while(true){
  //   try{
      yield throttle(1000, ON_CAL_ADJ_AMOUNT, runCalc)
  //   } catch(error) {
  //     console.log(error)
  //     return false
  //   }
  // }
}

function* watchRefreshAccessToken(){
  while(true){
    try{
      yield take(REFRESH_ACCESS_TOKEN)
      yield call(FetchAccessWithRefresh, action.config)

    } catch(error){

    }
  }
}

function* watchRefreshAllData(){
  while(true){
    try{
      yield take(REFRESH_ALL_DATA)
      yield put(fetchSelection())   // just selection
      yield put(sagaNavbarAlerts()) // just navbar alerts
      yield put(fetchCollaterals()) // just collaterals
      yield put(onInitDashboard())  // has both dashboard and dashboard currency
      yield put(onInitReconState()) // has recon, recon currency
      yield put(fetchDepartures())  // just departures
    } catch(error){

    }
  }
}

export default function* root() {
  yield [
    fork(serverHealthChecks),
    fork(sagaNavbarAlerts),
    fork(watchLogin),
    fork(watchLogout),
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
    fork(watchReplaceAllocatedAsset),
    fork(watchRefreshAccessToken),
    fork(watchRefreshAllData),

    fork(watchFetchAnalyticsData),
    fork(watchDeployedPopupChangeAmount)
  ]
}
