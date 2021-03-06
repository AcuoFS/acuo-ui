/**
 * Created by Rui on 28/6/17.
 */
import {
  DO_LOGIN,
  UPDATE_LOGIN_PROCESS,
  UPDATE_WRONG_CREDENTIALS_FLAG,
  DO_LOGOUT
  // FORCE_LOGOUT
  // UPDATE_CLIENT_ID
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

export const doLogout = () => ({
  type: DO_LOGOUT
})

// export const forceLogout = () => ({
//   type: FORCE_LOGOUT
// })
// export const updateCLientID = (clientID) => ({
//   type: UPDATE_CLIENT_ID,
//   clientID
// })