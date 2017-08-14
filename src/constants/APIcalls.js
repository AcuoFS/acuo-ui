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
export const DASHBOARD_URL                  = CONFIG.DASHBOARD_URL

// Recon
// export const RECON_URL = 'http://margin.acuo.com/acuo/api/margin/items/all/999'
export const RECON_URL                      = CONFIG.RECON_URL

// Pledge
// export const OPTIMISATION_URL         = 'http://margin.acuo.com/acuo/api/pledge/settings/optimization/999'
// export const MARGIN_SELECTION_URL     = 'http://52.74.186.112:8081/init-selection'
// export const COLLATERAL_URL           = 'http://52.74.186.112:8081/init-collateral'
// export const ALLOCATE_COLLATERALS_URL = 'http://52.74.186.112:8081/allocate-selection'

export const OPTIMISATION_URL               = CONFIG.OPTIMISATION_URL
export const COLLATERAL_URL                 = CONFIG.COLLATERAL_URL
export const MARGIN_SELECTION_URL           = CONFIG.MARGIN_SELECTION_URL
export const ALLOCATE_COLLATERALS_URL       = CONFIG.ALLOCATE_COLLATERALS_URL
export const ALLOCATE_COLLATERALS_URL_NEW   = CONFIG.ALLOCATE_COLLATERALS_URL_NEW
export const PLEDGE_ALLOCATIONS             = CONFIG.PLEDGE_ALLOCATIONS
export const PLEDGE_REMOVE_ALLOCATED_ASSET  = CONFIG.PLEDGE_REMOVE_ALLOCATED_ASSET

// POST
export const UPLOAD_FILE_URL                = CONFIG.UPLOAD_FILE_URL
export const RECON_DATA_URL                 = CONFIG.RECON_DATA_URL

export const REMOVE_ASSET_ALLOCATION_URL    = CONFIG.REMOVE_ASSET_ALLOCATION_URL
export const POST_MARGIN_CALL_IDS           = CONFIG.POST_MARGIN_CALL_IDS

// UNMATCHED PORTFOLIO
export const UNMATCHED_PORTFOLIO_URL        = CONFIG.UNMATCHED_PORTFOLIO_URL
export const SEND_RECON_DISPUTE_URL         = CONFIG.SEND_RECON_DISPUTE_URL

//fetch generated portfolio
export const FETCH_GENERATED_PORTFOLIO      = CONFIG.FETCH_GENERATED_PORTFOLIO

//request valuation
export const REQUEST_VALUATION_URL          = CONFIG.REQUEST_VALUATION_URL

//generate margin calls
export const REQUEST_GENERATE_MARGIN_CALLS      = CONFIG.REQUEST_GENERATE_MARGIN_CALLS

//fetch departures
export const FETCH_DEPLOYED_DEPARTURES      = CONFIG.FETCH_DEPLOYED_DEPARTURES

//server health checks
export const PROXY_HEALTH_CHECK             = CONFIG.PROXY_HEALTH_CHECK
export const MARGIN_HEALTH_CHECK            = CONFIG.MARGIN_HEALTH_CHECK
export const VALUATION_HEALTH_CHECK         = CONFIG.VALUATION_HEALTH_CHECK
export const COLLATERAL_HEALTH_CHECK        = CONFIG.COLLATERAL_HEALTH_CHECK

//fetch navbar alerts
export const FETCH_NAVBAR_ALERTS            = CONFIG.FETCH_NAVBAR_ALERTS


