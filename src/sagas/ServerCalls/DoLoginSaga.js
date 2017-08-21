/**
 * Created by Rui on 11/8/17.
 */

import { LOGIN_URL } from '../../constants/APIcalls'

export const DoLoginSaga = (user, pass) => (
  fetch(LOGIN_URL, {
    method: 'POST',
    body: JSON.stringify({
      user,
      pass
    }),
    headers: {'content-type': 'application/json'},
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    // console.log(response)
    return response.json()
  }).then(json => {
    return json
  })
)