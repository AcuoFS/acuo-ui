/**
 * Created by Rui on 31/7/17.
 */
import axios from 'axios'

import { REQUEST_GENERATE_MARGIN_CALLS } from '../../constants/APIcalls'

export const GenerateMarginCallSaga = (referenceIDs) =>
  axios.post(REQUEST_GENERATE_MARGIN_CALLS,
    {"ids": referenceIDs, clientId: window.localStorage.clientId},
    {"content-type": 'application/json'}
  ).then(response => {
    // if(response.data.ok)
    return response.data
    // alert('request generate margin call failed, try again')
    //dispatch(MarginCallUploadActions.updateRequestState(false))
  }).catch(error => {
      console.log(error)
      alert('request generate margin call failed, try again')
    })
