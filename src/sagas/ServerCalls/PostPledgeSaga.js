/**
 * Created by Rui on 8/8/17.
 */

import { PLEDGE_ALLOCATIONS } from '../../constants/APIcalls'

export const PostPledgeSaga = (pledgeToSend) =>
  fetch(PLEDGE_ALLOCATIONS, {
    method: 'POST',
    body: JSON.stringify(Object.assign(pledgeToSend, {clientId: window.localStorage.clientID})),
    headers: {'content-type': 'application/json'},
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    return response
  }).catch(error => {
    console.log('Error: ' + error)
  })