var configJson = {
    'baseUrl' : 'http://localhost',
    '$dev_baseUrl' : 'http://dev.acuo.com',
    '$local_baseUrl' : 'http://52.74.186.112',
    '$qa_baseUrl' : 'http://qa.acuo.com',
    DASHBOARD_URL: '<%= baseUrl %>/proxy/dashboard',
    RECON_URL: '<%= baseUrl %>/proxy/recon/new',
    OPTIMISATION_URL: '<%= baseUrl %>/proxy/pledge/optimization',
    COLLATERAL_URL: '<%= baseUrl %>/proxy/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: '<%= baseUrl %>/proxy/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: '<%= baseUrl %>/proxy/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: '<%= baseUrl %>/proxy/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: '<%= baseUrl %>/proxy/pledge/pledge-allocation',
    UPLOAD_FILE_URL: '<%= baseUrl %>/valuation/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: '<%= baseUrl %>/margin/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: '<%= baseUrl %>/proxy/unmatched',
    SEND_RECON_DISPUTE_URL: '<%= baseUrl %>/proxy/recon/disputeStatement',
    PLEDGE_REMOVE_ALLOCATED_ASSET: '<%= baseUrl %>/proxy/pledge/remove-allocated-asset',
    FETCH_GENERATED_PORTFOLIO: '<%= baseUrl %>/valuation/acuo/api/calls/async/generate/',
    FETCH_DEPLOYED_DEPARTURES: '<%= baseUrl %>/margin/acuo/api/pledge/assets/all',
    POST_MARGIN_CALL_IDS: '<%= baseUrl %>/margin/acuo/api/margin/send/calls',
    PROXY_HEALTH_CHECK: '<%= baseUrl %>/proxy/common/check-connectivity',
    MARGIN_HEALTH_CHECK: '<%= baseUrl %>/margin/acuo/admin/ping',
    VALUATION_HEALTH_CHECK: '<%= baseUrl %>/valuation/acuo/admin/ping',
    COLLATERAL_HEALTH_CHECK: '<%= baseUrl %>/collateral/acuo/admin/ping'
}

exports.get = (env) => {
  console.log('Current config environment accessed is ' + (env || 'dev'))
  var config = require('json-configurator')(configJson, env);
  return config
}