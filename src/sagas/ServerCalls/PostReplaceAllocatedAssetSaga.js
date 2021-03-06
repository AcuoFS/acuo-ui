/**
 * Created by Rui on 20/12/17.
 */

import { PLEDGE_ALLOCATIONS } from '../../constants/APIcalls'

export const PostReplaceAllocatedAssetSaga = (obj) =>
  fetch('', {
    method: 'POST',
    body: JSON.stringify(Object.assign(obj, {clientId: window.localStorage.clientId})),
    withCredentials: false,
    headers: {'content-type': 'application/json'},
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    return response
  }).catch(error => {
    console.log('Error: ' + error)
  })