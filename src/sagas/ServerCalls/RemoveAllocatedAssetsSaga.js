/**
 * Created by Rui on 10/8/17.
 */

import { PLEDGE_REMOVE_ALLOCATED_ASSET } from '../../constants/APIcalls'

export const RemoveAllocatedAssetsSaga = (obj) =>
  fetch(PLEDGE_REMOVE_ALLOCATED_ASSET, {
    method: 'POST',
    body: JSON.stringify(Object.assign(obj, {clientId: window.localStorage.clientId})),
    headers: {'content-type': 'application/json'},
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    return response.json()
  }).then(json => {
    return json
  }).catch(error => {
    console.log('Error: ' + error)
  })