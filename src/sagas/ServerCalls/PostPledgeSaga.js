/**
 * Created by Rui on 8/8/17.
 */
import axios from 'axios'

import { PLEDGE_ALLOCATIONS } from '../../constants/APIcalls'

export const PostPledgeSaga = (pledgeToSend) =>
  axios.post(PLEDGE_ALLOCATIONS, Object.assign(pledgeToSend,
    {clientId: window.localStorage.clientId}),
    {'content-type': 'application/json'},
  ).then(response => {
    return response.data
  }).catch(error => {
    console.log('Error: ' + error)
  })