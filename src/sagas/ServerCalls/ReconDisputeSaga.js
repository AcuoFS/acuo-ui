/**
 * Created by Rui on 28/7/17.
 */
import axios from 'axios'

import {RECON_URL, SEND_RECON_DISPUTE_URL} from '../../constants/APIcalls'

export const ReconDisputeSaga = (disputeObjToSend) =>
  axios.post(SEND_RECON_DISPUTE_URL,
    Object.assign(disputeObjToSend, {clientId: window.localStorage.clientId}),
    {
      withCredentials: false,
      headers: {'content-type': 'application/json'}
    }
  ).then(response => {
    //console.log(response)
    // if (response.status === 200 || response.status === 201) {
    //   //alert('Sent dispute to backend successfully!')
    // } else {
    //   //alert('Unknown status code received: ' + response.status)
    // }
    // return axios.get(`${RECON_URL}/${window.localStorage.clientId}`).then((response) => {
    //   const { items } = response.data
    //   return items
    // })
    return response
  }).catch(error => {
    console.log('Error: ' + error)
  })
