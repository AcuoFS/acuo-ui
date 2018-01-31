/**
 * Created by Rui on 10/8/17.
 */
import axios from 'axios'

import { PLEDGE_REMOVE_ALLOCATED_ASSET } from '../../constants/APIcalls'

export const RemoveAllocatedAssetsSaga = (obj) =>
  axios.post(PLEDGE_REMOVE_ALLOCATED_ASSET,
    Object.assign(obj, {clientId: window.localStorage.clientId}),
    {'content-type': 'application/json'}
  ).then(response => {
    return response.data
  }).catch(error => {
    console.log('Error: ' + error)
  })