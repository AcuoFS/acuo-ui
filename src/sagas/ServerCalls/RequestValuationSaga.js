/**
 * Created by Rui on 28/7/17.
 */
import axios from 'axios'

import { REQUEST_VALUATION_URL } from '../../constants/APIcalls'

export const RequestValuationSaga = (referenceIDs) =>
  axios.post(REQUEST_VALUATION_URL, {"ids": referenceIDs, clientId: window.localStorage.clientId},
    {
      withCredentials: false,
      headers: {'content-type': 'application/json'}
    }
  ).then(response => {
    // console.log(response)
    // if(response.ok)
    return response.data
    // alert('request valuation failed, try again')
    //dispatch(MarginCallUploadActions.updateRequestState(false))
  }).catch(error => {
      console.log(error)
      alert('request valuation failed, try again')
    })
