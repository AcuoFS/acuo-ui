var configJson = {
  'baseUrl': 'http://dev.acuo.com',
  '$dev_baseUrl': 'http://dev.acuo.com',
  '$local_baseUrl': 'http://localhost:8081',
  '$qa_baseUrl': 'http://qa.acuo.com',
  DASHBOARD_URL: '/proxy/dashboard',
  RECON_URL: '/proxy/recon/new',
  OPTIMISATION_URL: '/proxy/pledge/optimization',
  COLLATERAL_URL: '/proxy/pledge/init-new-collateral',
  MARGIN_SELECTION_URL: '/proxy/pledge/init-selection',
  ALLOCATE_COLLATERALS_URL: '/proxy/pledge/allocate-selection',
  ALLOCATE_COLLATERALS_URL_NEW: '/proxy/pledge/allocate-selection-new',
  PLEDGE_ALLOCATIONS: '/proxy/pledge/pledge-allocation',
  UPLOAD_FILE_URL: '<%= baseUrl %>/valuation/acuo/api/upload/v1',
  // Please add the trailing / for recon single item (ok button)
  RECON_DATA_URL: '<%= baseUrl %>/margin/acuo/api/margin/reconcile/',
  REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
  UNMATCHED_PORTFOLIO_URL: '/proxy/unmatched',
  SEND_RECON_DISPUTE_URL: '/proxy/recon/disputeStatement',
  PLEDGE_REMOVE_ALLOCATED_ASSET: '/proxy/pledge/remove-allocated-asset',
  FETCH_GENERATED_PORTFOLIO: '<%= baseUrl %>/valuation/acuo/api/calls/async/generate/',
  FETCH_DEPLOYED_DEPARTURES: '<%= baseUrl %>/margin/acuo/api/pledge/assets/all',
  POST_MARGIN_CALL_IDS: '<%= baseUrl %>/margin/acuo/api/margin/send/calls',
  PROXY_HEALTH_CHECK: '/proxy/common/check-connectivity',
  MARGIN_HEALTH_CHECK: '<%= baseUrl %>/margin/acuo/admin/ping',
  VALUATION_HEALTH_CHECK: '<%= baseUrl %>/valuation/acuo/admin/ping',
  COLLATERAL_HEALTH_CHECK: '<%= baseUrl %>/collateral/acuo/admin/ping',
  FETCH_NAVBAR_ALERTS: '<%= baseUrl %>/margin/acuo/api/dashboard/menu'
}

exports.get = (env) => {
  console.log('Current config environment accessed is ' + (env || 'dev'))
  var config = require('json-configurator')(configJson, env);
  return config
}
