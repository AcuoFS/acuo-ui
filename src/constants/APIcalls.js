/** @name CONFIG object from defineplugin of webpack on env-specific params
 *  FEATURE REMOVED, ENV NEEDS TO BE DEFINED AT RUNTIME INSTEAD OF BUILD TIME
 * */
// import config from './config'
//
// const env = process.env.DOCKER_ENV || ''
// const CONFIG = config.get(env)

// console.log('api')
// console.log(process)
// console.log(process.env)
// console.log(process.env.DOCKER_ENV)

// Dashboard
// export const DASHBOARD_URL = 'http://margin.acuo.com/acuo/api/margin/dashboard'
export const DASHBOARD_URL = CONFIG.DASHBOARD_URL

// Recon
// export const RECON_URL = 'http://margin.acuo.com/acuo/api/margin/items/all/999'
export const RECON_URL = CONFIG.RECON_URL

// Pledge
// export const OPTIMISATION_URL         = 'http://margin.acuo.com/acuo/api/pledge/settings/optimization/999'
// export const MARGIN_SELECTION_URL     = 'http://52.74.186.112:8081/init-selection'
// export const COLLATERAL_URL           = 'http://52.74.186.112:8081/init-collateral'
// export const ALLOCATE_COLLATERALS_URL = 'http://52.74.186.112:8081/allocate-selection'

export const OPTIMISATION_URL         = CONFIG.OPTIMISATION_URL
export const COLLATERAL_URL           = CONFIG.COLLATERAL_URL
export const MARGIN_SELECTION_URL     = CONFIG.MARGIN_SELECTION_URL
export const ALLOCATE_COLLATERALS_URL = CONFIG.ALLOCATE_COLLATERALS_URL
export const ALLOCATE_COLLATERALS_URL_NEW = CONFIG.ALLOCATE_COLLATERALS_URL_NEW
export const PLEDGE_ALLOCATIONS = CONFIG.PLEDGE_ALLOCATIONS

// POST
export const UPLOAD_FILE_URL = CONFIG.UPLOAD_FILE_URL
export const RECON_DATA_URL  = CONFIG.RECON_DATA_URL

export const REMOVE_ASSET_ALLOCATION_URL = CONFIG.REMOVE_ASSET_ALLOCATION_URL

// UNMATCHED PORTFOLIO
export const UNMATCHED_PORTFOLIO_URL = CONFIG.UNMATCHED_PORTFOLIO_URL
