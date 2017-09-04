/**
 * Created by Rui on 28/6/17.
 */
import {
  DO_LOGIN,
  UPDATE_LOGIN_PROCESS,
  UPDATE_WRONG_CREDENTIALS_FLAG
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

export const updateWrongCredentialsFlag = flag => ({
  type: UPDATE_WRONG_CREDENTIALS_FLAG,
  flag
})