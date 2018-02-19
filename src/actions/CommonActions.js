import {
  UPDATE_NAVBAR_ALERTS,
  SAGA_NAVBAR_ALERTS,
  SCREEN_RESIZE,
  TOGGLE_CHAT_MINIMISE,
  TOGGLE_CHAT_OPEN,
  OPEN_CHAT,
  UPDATE_CURRENCY_INFO,
  UPDATE_EMAIL_ADD,
  REFRESH_ACCESS_TOKEN
} from './../constants/ActionTypes'

export const updateNavbarAlerts = alerts => ({
  type: UPDATE_NAVBAR_ALERTS,
  alerts
})

export const sagaNavbarAlerts = () => ({
  type: SAGA_NAVBAR_ALERTS
})

export const updateScreensize = (noPrompt) => ({
  type: SCREEN_RESIZE,
  noPrompt
})

export const toggleChatMinimise = () => ({
  type: TOGGLE_CHAT_MINIMISE
})

export const toggleChatOpen = () => ({
  type: TOGGLE_CHAT_OPEN
})

export const defaultChatOpen = () => ({
  type: OPEN_CHAT
})

export const updateCurrencyInfo = (currencyObj) => ({
  type: UPDATE_CURRENCY_INFO,
  currencyObj
})

export const setEmailAdd = (email) => ({
  type: UPDATE_EMAIL_ADD,
  email
})

export const refreshAccessToken = () => ({
  type: REFRESH_ACCESS_TOKEN
})