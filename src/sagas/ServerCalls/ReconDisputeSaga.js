/**
 * Created by Rui on 28/7/17.
 */
import {RECON_URL, SEND_RECON_DISPUTE_URL} from '../../constants/APIcalls'

export const ReconDisputeSaga = (disputeObjToSend) => {
  return fetch(SEND_RECON_DISPUTE_URL, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(Object.assign(disputeObjToSend, {clientId: window.localStorage.clientId}))
  }).then(response => {
    //console.log(response)
    if (response.status === 200 || response.status === 201) {
      //alert('Sent dispute to backend successfully!')
    } else {
      //alert('Unknown status code received: ' + response.status)
    }

    return fetch(`${RECON_URL}/${window.localStorage.clientID}`).then((response) => {
      return response.json()
    }).then((obj) => {
      const { items } = obj
      return items
    })
  }).catch(error => {
    console.log('Error: ' + error)
  })
}