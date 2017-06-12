import {
  UPDATE_NAVBAR_ALERTS,
  SAGA_NAVBAR_ALERTS
} from './../constants/ActionTypes'

export const updateNavbarAlerts = alerts => ({
  type: UPDATE_NAVBAR_ALERTS,
  alerts
})

export const sagaNavbarAlerts = () => ({
  type: SAGA_NAVBAR_ALERTS
})