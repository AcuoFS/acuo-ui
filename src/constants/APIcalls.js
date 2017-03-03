/** @name CONFIG object from defineplugin of webpack on env-specific params
 *
 * */

// Dashboard
// export const DASHBOARD_URL = 'http://margin.acuo.com/acuo/api/margin/dashboard'
<<<<<<< HEAD
export const DASHBOARD_URL = 'http://qa.acuo.com:8181/dashboard'

// Recon
// export const RECON_URL = 'http://margin.acuo.com/acuo/api/margin/items/all/999'
export const RECON_URL = 'http://qa.acuo.com:8181/recon'
=======
export const DASHBOARD_URL = CONFIG.DASHBOARD_URL

// Recon
// export const RECON_URL = 'http://margin.acuo.com/acuo/api/margin/items/all/999'
export const RECON_URL = CONFIG.RECON_URL
>>>>>>> af51e18d15053da5afce9c1af7b3af00426b215d

// Pledge
// export const OPTIMISATION_URL         = 'http://margin.acuo.com/acuo/api/pledge/settings/optimization/999'
// export const MARGIN_SELECTION_URL     = 'http://52.74.186.112:8081/init-selection'
// export const COLLATERAL_URL           = 'http://52.74.186.112:8081/init-collateral'
// export const ALLOCATE_COLLATERALS_URL = 'http://52.74.186.112:8081/allocate-selection'

<<<<<<< HEAD
export const OPTIMISATION_URL         = 'http://qa.acuo.com:8181/pledge/optimization'
export const COLLATERAL_URL           = 'http://qa.acuo.com:8181/pledge/init-new-collateral'
export const MARGIN_SELECTION_URL     = 'http://qa.acuo.com:8181/pledge/init-selection'
export const ALLOCATE_COLLATERALS_URL = 'http://qa.acuo.com:8181/pledge/allocate-selection'
export const ALLOCATE_COLLATERALS_URL_NEW = 'http://qa.acuo.com:8181/pledge/allocate-selection-new'
export const PLEDGE_ALLOCATIONS = 'http://qa.acuo.com:8181/pledge/pledge-allocation'

// POST
export const UPLOAD_FILE_URL = 'http://qa.acuo.com:9090/acuo/api/upload'
export const RECON_DATA_URL  = 'http://qa.acuo.com:7070/acuo/api/margin/reconcile/'
=======
export const OPTIMISATION_URL         = CONFIG.OPTIMISATION_URL
export const COLLATERAL_URL           = CONFIG.COLLATERAL_URL
export const MARGIN_SELECTION_URL     = CONFIG.MARGIN_SELECTION_URL
export const ALLOCATE_COLLATERALS_URL = CONFIG.ALLOCATE_COLLATERALS_URL
export const ALLOCATE_COLLATERALS_URL_NEW = CONFIG.ALLOCATE_COLLATERALS_URL_NEW
export const PLEDGE_ALLOCATIONS = CONFIG.PLEDGE_ALLOCATIONS

// POST
export const UPLOAD_FILE_URL = CONFIG.UPLOAD_FILE_URL
export const RECON_DATA_URL  = CONFIG.RECON_DATA_URL
>>>>>>> af51e18d15053da5afce9c1af7b3af00426b215d

export const REMOVE_ASSET_ALLOCATION_URL = CONFIG.REMOVE_ASSET_ALLOCATION_URL

// UNMATCHED PORTFOLIO
<<<<<<< HEAD
export const UNMATCHED_PORTFOLIO_URL = 'http://qa.acuo.com:8181/unmatched'
=======
export const UNMATCHED_PORTFOLIO_URL = CONFIG.UNMATCHED_PORTFOLIO_URL
>>>>>>> af51e18d15053da5afce9c1af7b3af00426b215d
