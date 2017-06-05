import {
  PROXY_HEALTH_CHECK,
  MARGIN_HEALTH_CHECK,
  VALUATION_HEALTH_CHECK,
  COLLATERAL_HEALTH_CHECK
} from './../constants/APIcalls'

export const checkProxyServerConnectivity = () => {
  return fetch(PROXY_HEALTH_CHECK).then(response => {
    return 'passed'
  }, error => {
    return 'failed'
  })
}

export const checkMarginServerConnectivity = () => {
  return fetch(MARGIN_HEALTH_CHECK).then(response => {
    return 'passed'
  }, error => {
    return 'failed'
  })
}

export const checkValuationServerConnectivity = () => {
  return fetch(VALUATION_HEALTH_CHECK).then(response => {
    return 'passed'
  }, error => {
    return 'failed'
  })
}

export const checkCollateralServerConnectivity = () => {
  return fetch(COLLATERAL_HEALTH_CHECK).then(response => {
    return 'passed'
  }, error => {
    return 'failed'
  })
}