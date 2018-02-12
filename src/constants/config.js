var configJson = {
  'baseUrl': 'not_used',
  DASHBOARD_URL: '/proxy/dashboard',
  RECON_URL: '/proxy/recon/new',
  OPTIMISATION_URL: '/proxy/pledge/optimization',
  COLLATERAL_URL: '/proxy/pledge/init-new-collateral',
  MARGIN_SELECTION_URL: '/proxy/pledge/init-selection',
  ALLOCATE_COLLATERALS_URL: '/proxy/pledge/allocate-selection',
  ALLOCATE_COLLATERALS_URL_NEW: '/proxy/pledge/allocate-selection-new',
  PLEDGE_ALLOCATIONS: '/proxy/pledge/pledge-allocation',
  UPLOAD_FILE_URL: '/proxy/upload/uploadPortfolio',
  // Please add the trailing / for recon single item (ok button)
  // RECON_DATA_URL: '<%= baseUrl %>/margin/acuo/api/margin/reconcile/',
  RECON_DATA_URL: '/proxy/recon/reconcile',
  REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
  UNMATCHED_PORTFOLIO_URL: '/proxy/unmatched',
  SEND_RECON_DISPUTE_URL: '/proxy/recon/disputeStatement',
  PLEDGE_REMOVE_ALLOCATED_ASSET: '/proxy/pledge/remove-allocated-asset',
  FETCH_DEPLOYED_DEPARTURES: '/proxy/deployed/departures',
  PROXY_HEALTH_CHECK: '/proxy/common/proxy-connectivity',
  MARGIN_HEALTH_CHECK: '/proxy/common/margin-connectivity',
  VALUATION_HEALTH_CHECK: '/proxy/common/valuation-connectivity',
  COLLATERAL_HEALTH_CHECK: '/proxy/common/collateral-connectivity',
  FETCH_NAVBAR_ALERTS: '/proxy/common/navbar-alerts',
  REQUEST_VALUATION_URL: '/proxy/upload/request-valuation',
  REQUEST_GENERATE_MARGIN_CALLS: '/proxy/upload/request-margincalls',
  //FETCH_GENERATED_PORTFOLIO: '<%= baseUrl %>/valuation/acuo/api/calls/async/generate/',
  POST_MARGIN_CALL_IDS: '/proxy/upload/send-margin-calls',
  LOGIN_URL: '/proxy/common/auth/login',
  LOGOUT_URL: '/proxy/common/auth/logout',
  FETCH_CURRENCY_INFO: '/proxy/common/get-currency',

  TEST_FETCH_ANALYTICS_DATA: '/proxy/analytics',
}

exports.get = (env) => {
  console.log('Current config environment accessed is ' + (env || 'dev'))
  var config = require('json-configurator')(configJson, env);
  return config
}
