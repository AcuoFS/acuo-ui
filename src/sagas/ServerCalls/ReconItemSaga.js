/**
 * Created by Rui on 27/7/17.
 */
import { RECON_DATA_URL, RECON_URL } from '../../constants/APIcalls'

export const ReconItemSaga = (params) =>{

  // let result = {}

  return fetch(RECON_DATA_URL, {
    method: 'post',
    body: JSON.stringify({params, clientID: window.localStorage.clientID})
  }).then(response => {
    // console.log('response ' + JSON.stringify(response))
    // console.log(response)
    return response
  }).then(obj => {
    // console.log('refreshing recon data...')
    return fetch(RECON_URL).then((response) => {
      // console.log(response)
      return response.json()
    }).then((obj) => {
      // console.log(obj)
      // console.log('Data fetched: ' + obj)
      // const {items} = obj
      // dispatch(reconInitState(items))
      return obj
    })
  })
  // console.log(result)
  // return result
}
