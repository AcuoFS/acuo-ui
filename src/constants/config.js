const config = {
  dev: {
    DASHBOARD_URL: 'http://52.74.186.112:8081/dashboard',
    RECON_URL: 'http://52.74.186.112:8081/recon',
    OPTIMISATION_URL: 'http://52.74.186.112:8081/pledge/optimization',
    COLLATERAL_URL: 'http://52.74.186.112:8081/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: 'http://52.74.186.112:8081/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: 'http://52.74.186.112:8081/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: 'http://52.74.186.112:8081/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: 'http://52.74.186.112:8081/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://valuation.acuo.com/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://margin.acuo.com/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: 'http://52.74.186.112:8081/unmatched'
  },
  qa: {
    DASHBOARD_URL: 'qa',
    RECON_URL: 'qa',
    OPTIMISATION_URL: 'qa',
    COLLATERAL_URL: 'qa',
    MARGIN_SELECTION_URL: 'qa',
    ALLOCATE_COLLATERALS_URL: '',
    ALLOCATE_COLLATERALS_URL_NEW: 'qa',
    PLEDGE_ALLOCATIONS: 'qa',
    UPLOAD_FILE_URL: 'qa',
    RECON_DATA_URL: 'qa',
    REMOVE_ASSET_ALLOCATION_URL: 'qa',
    UNMATCHED_PORTFOLIO_URL: 'qa'
  },
  prod: {}
}

exports.get = (env) => {
  console.log('Current config environment accessed is ' + (env || 'dev'))
  return config[env] || config.dev
}