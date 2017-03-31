
const config = {
  dev: {
    DASHBOARD_URL: 'http://dev.acuo.com:8181/dashboard',
    RECON_URL: 'http://dev.acuo.com:8181/recon',
    OPTIMISATION_URL: 'http://dev.acuo.com:8181/pledge/optimization',
    COLLATERAL_URL: 'http://dev.acuo.com:8181/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: 'http://dev.acuo.com:8181/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: 'http://dev.acuo.com:8181/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: 'http://dev.acuo.com:8181/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: 'http://dev.acuo.com:8181/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://valuation.acuo.com/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://margin.acuo.com/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: 'http://dev.acuo.com:8181/unmatched'
  },
  local: {
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
    DASHBOARD_URL: 'http://qa.acuo.com:8181/dashboard',
    RECON_URL: 'http://qa.acuo.com:8181/recon',
    OPTIMISATION_URL: 'http://qa.acuo.com:8181/pledge/optimization',
    COLLATERAL_URL: 'http://qa.acuo.com:8181/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: 'http://qa.acuo.com:8181/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: 'http://qa.acuo.com:8181/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: 'http://qa.acuo.com:8181/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: 'http://qa.acuo.com:8181/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://qa.acuo.com:9090/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://qa.acuo.com:7070/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: 'http://qa.acuo.com:8181/unmatched'
  },
  prod: {},
  test: {
    DASHBOARD_URL: 'http://localhost:8081/dashboard',
    RECON_URL: 'http://localhost:8081/recon',
    OPTIMISATION_URL: 'http://localhost:8081/pledge/optimization',
    COLLATERAL_URL: 'http://localhost:8081/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: 'http://localhost:8081/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: 'http://localhost:8081/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: 'http://localhost:8081/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: 'http://localhost:8081/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://valuation.acuo.com/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://margin.acuo.com/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: 'http://localhost:8081/unmatched'
  }
}

exports.get = (env) => {
  // console.log('config')
  // console.log(`config env: ${env}`)
  // console.log(process)
  // console.log(process.env)
  // console.log(process.env.DOCKER_ENV)
  console.log('Current config environment accessed is ' + (env || 'local'))
  return config[env] || config.local
}
