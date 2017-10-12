import {
  UPDATE_NAVBAR_ALERTS,
  SAGA_NAVBAR_ALERTS,
  SCREEN_RESIZE,
  TOGGLE_CHAT_MINIMISE,
  TOGGLE_CHAT_OPEN,
  OPEN_CHAT
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