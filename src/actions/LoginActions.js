/**
 * Created by Rui on 28/6/17.
 */
import {
  DO_LOGIN,
  UPDATE_LOGIN_PROCESS
} from '../constants/ActionTypes'

export const doLogin = (user, pass) => ({
  type: DO_LOGIN,
  user,
  pass
})

export const updateLoginProcess = (status) => ({
  type: UPDATE_LOGIN_PROCESS,
  status
})