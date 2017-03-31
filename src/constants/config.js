const DEV_URL = 'http://dev.acuo.com:8181'
const UBUNTU_URL = 'http://52.74.186.112:8081'

const config = {
  dev: {
    DASHBOARD_URL: DEV_URL + '/dashboard',
    RECON_URL: DEV_URL + '/recon/new',
    OPTIMISATION_URL: DEV_URL + '/pledge/optimization',
    COLLATERAL_URL: DEV_URL + '/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: DEV_URL + '/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: DEV_URL + '/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: DEV_URL + '/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: DEV_URL + '/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://valuation.acuo.com/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://margin.acuo.com/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: DEV_URL + '/unmatched',
    SEND_RECON_DISPUTE_URL: DEV_URL + '/recon/disputeStatement'
  },
  local: {
    DASHBOARD_URL: UBUNTU_URL + '/dashboard',
    RECON_URL: UBUNTU_URL + '/recon/new',
    OPTIMISATION_URL: UBUNTU_URL + '/pledge/optimization',
    COLLATERAL_URL: UBUNTU_URL + '/pledge/init-new-collateral',
    MARGIN_SELECTION_URL: UBUNTU_URL + '/pledge/init-selection',
    ALLOCATE_COLLATERALS_URL: UBUNTU_URL + '/pledge/allocate-selection',
    ALLOCATE_COLLATERALS_URL_NEW: '/pledge/allocate-selection-new',
    PLEDGE_ALLOCATIONS: UBUNTU_URL + '/pledge/pledge-allocation',
    UPLOAD_FILE_URL: 'http://valuation.acuo.com/acuo/api/upload',
    // Please add the trailing / for recon single item (ok button)
    RECON_DATA_URL: 'http://margin.acuo.com/acuo/api/margin/reconcile/',
    REMOVE_ASSET_ALLOCATION_URL: 'url to remove(and earmark) asset from margin call',
    UNMATCHED_PORTFOLIO_URL: UBUNTU_URL + '/unmatched',
    SEND_RECON_DISPUTE_URL: UBUNTU_URL + '/recon/disputeStatement'
  },
  qa: {
    DASHBOARD_URL: 'http://qa.acuo.com:8181/dashboard',
    RECON_URL: 'http://qa.acuo.com:8181/recon/new',
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
    UNMATCHED_PORTFOLIO_URL: 'http://qa.acuo.com:8181/unmatched',
    SEND_RECON_DISPUTE_URL: 'New endpoint !!!'
  },
  prod: {}
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
