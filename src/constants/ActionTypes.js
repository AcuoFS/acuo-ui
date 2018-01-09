export const INIT_STATE = 'INIT_STATE'
export const ON_INIT_DASHBOARD = 'ON_INIT_DASHBOARD'
export const RECON_INIT_STATE = 'RECON_INIT_STATE'
export const ON_INIT_RECON = 'ON_INIT_RECON'
export const UPDATE_SELECTED_CURRENCY = 'UPDATE_SELECTED_CURRENCY'

//filters
export const FILTER_STATE_DERIV = 'FILTER_STATE_DERIV'
export const FILTER_STATE_LEGAL = 'FILTER_STATE_LEGAL'
export const FILTER_STATE_TIMEWINDOW = 'FILTER_STATE_TIMEWINDOW'
export const FILTER_STATE_STATUS = 'FILTER_STATE_STATUS'
export const FILTER_STATE_CPTYORG = 'FILTER_STATE_CPTYORG'
export const FILTER_STATE_CPTYENTITY = 'FILTER_STATE_CPTYENTITY'

//filters for recon page
//status is removed as all items in recon page should be with status = unrecon
export const FILTER_RECON_STATE_DERIV = 'FILTER_RECON_STATE_DERIV'
export const FILTER_RECON_STATE_LEGAL = 'FILTER_RECON_STATE_LEGAL'
export const FILTER_RECON_STATE_TIMEWINDOW = 'FILTER_RECON_STATE_TIMEWINDOW'
export const FILTER_RECON_STATE_CPTYORG = 'FILTER_RECON_STATE_CPTYORG'
export const FILTER_RECON_STATE_CPTYENTITY = 'FILTER_RECON_STATE_CPTYENTITY'

//recon
export const LINE_ITEM_INSERTION = 'LINE_ITEM_INSERTION'
export const SELECT_ITEM = 'SELECT_ITEM'
export const RECON_ITEM = 'RECON_ITEM'
export const RECON_DISPUTE_SUBMIT = 'RECON_DISPUTE_SUBMIT'

//recon revamp
export const FIRSTLEVEL_SELECT = 'FIRSTLEVEL_SELECT'
export const RECON_FILTER_SET = 'RECON_FILTER_SET'
export const SECONDLEVEL_SELECT = 'SECONDLEVEL_SELECT'
export const INIT_CURRENCY_INFO = 'INIT_CURRENCY_INFO'

//pledge
export const UPDATE_COLLATERAL = 'UPDATE_COLLATERAL'
export const INIT_OPTIMISATION_SETTINGS = 'INIT_OPTIMISATION_SETTINGS'
export const UPDATE_OPTIMISATION_SETTINGS = 'UPDATE_OPTIMISATION_SETTINGS'
export const INIT_SELECTION = 'INIT_SELECTION'
export const TOGGLE_PENDING_ALLOCATION = 'TOGGLE_PENDING_ALLOCATION'
export const TOGGLE_CHECKALL = 'TOGGLE_CHECKALL'
export const CLEAR_PENDING_ALLOCATION = 'CLEAR_PENDING_ALLOCATION'
export const REMOVE_ASSET_FROM_EARMARK = 'REMOVE_ASSET_FROM_EARMARK'
export const PLEDGE_FILTER_SET = 'PLEDGE_FILTER_SET'
export const SELECTION_WIDGET__COLUMN_SORT = 'SELECTION_WIDGET__COLUMN_SORT'
export const ON_FETCH_OPTIMISATION_SETTINGS = 'ON_FETCH_OPTIMISATION_SETTINGS'
export const ON_FETCH_SELECTION = 'ON_FETCH_SELECTION'
export const ON_ALLOCATE_COLLATERALS = 'ON_ALLOCATE_COLLATERALS'
export const ON_FETCH_COLLATERALS = 'ON_FETCH_COLLATERALS'
export const ON_PLEDGE = 'ON_PLEDGE'
export const ON_REMOVE_ALLOCATED_ASSET = 'ON_REMOVE_ALLOCATED_ASSET'
export const ALLOCATING_COLLATERALS = 'ALLOCATING_COLLATERALS'

//margin call upload
export const GET_MARGIN_CALL_UPLOAD = 'GET_MARGIN_CALL_UPLOAD'
export const UPDATE_MARGIN_CALL_UPLOAD = 'UPDATE_MARGIN_CALL_UPLOAD'
// export const UPDATE_TXN_ID = 'UPDATE_TXN_ID'
// export const POLL_MARGIN_CALL = 'POLL_MARGIN_CALL'
// export const STOP_MARGIN_POLL = 'STOP_MARGIN_POLL'
export const REQUESTING_VALUATION = 'REQUESTING_VALUATION'
export const UPLOADING_PORTFOLIO = 'UPLOADING_PORTFOLIO'
export const MARGIN_CALL_GENERATED = 'MARGIN_CALL_GENERATED'
export const UPDATE_REQUESTING_STATE = 'UPDATE_REQUESTING_STATE'
export const ON_REQUEST_VALUATION = 'ON_REQUEST_VALUATION'
export const ON_REQUEST_GENERATE_MARGINCALL = 'ON_REQUEST_GENERATE_MARGINCALL'
export const ON_REQUEST_SEND_MARGINCALL = 'ON_REQUEST_SEND_MARGINCALL'
export const TOGGLE_SELECTED_MARGINCALL_ROW = 'TOGGLE_SELECTED_MARGINCALL_ROW'
export const TOGGLE_SELECT_ALL_MARGINCALLS = 'TOGGLE_SELECT_ALL_MARGINCALLS'
export const TOGGLE_VARIABLE_OPTIONS = 'TOGGLE_VARIABLE_OPTIONS'
export const ON_SEND_MARGINCALL_SUCCESS = 'ON_SEND_MARGINCALL_SUCCESS'

//unmatched portfolio
export const INIT_UNMATCHED_PORTFOLIO = 'INIT_UNMATCHED_PORTFOLIO'

//dispute
export const INIT_DISPUTE = 'INIT_DISPUTE'
export const UPDATE_DISPUTE_FILTER = 'UPDATE_DISPUTE_FILTER'

//agreements
export const INIT_AGREEMENT_SUMMARY = 'INIT_AGREEMENT_SUMMARY'
export const SET_CPTY_SUMMARY_EXPANDED = 'SET_CPTY_SUMMARY_EXPANDED'
export const INIT_AGREEMENT = 'INIT_AGREEMENT'

//deployed
export const INIT_DEPARTURES = 'INIT_DEPARTURES'
export const UPDATE_SELECTED_DEPARTURE_DATE = 'UPDATE_SELECTED_DEPARTURE_DATE'
export const FETCH_DEPARTURES = 'FETCH_DEPARTURES'

/** COMMON **/
//navbar alerts
export const UPDATE_NAVBAR_ALERTS = 'UPDATE_NAVBAR_ALERTS'
export const SAGA_NAVBAR_ALERTS = 'SAGA_NAVBAR_ALERTS'
//screenresize
export const SCREEN_RESIZE = 'SCREEN_RESIZE'
//login
export const UPDATE_WRONG_CREDENTIALS_FLAG = 'UPDATE_WRONG_CREDENTIALS_FLAG'
//currency info
export const UPDATE_CURRENCY_INFO = 'UPDATE_CURRENCY_INFO'
/** COMMON END **/

//login
export const DO_LOGIN = 'DO_LOGIN'
export const UPDATE_LOGIN_PROCESS = 'UPDATE_LOGIN_PROCESS'

//analytics
export const FLIP_AXES = 'FLIP_AXES'
export const SAGA_ANALYTICS_DATA = 'SAGA_ANALYTICS_DATA'
export const UPDATE_ANALYTICS_DATA = 'UPDATE_ANALYTICS_DATA'

//chat window
export const TOGGLE_CHAT_OPEN = 'TOGGLE_CHAT_OPEN'
export const TOGGLE_CHAT_MINIMISE = 'TOGGLE_CHAT_MINIMISE'
export const OPEN_CHAT = 'OPEN_CHAT'