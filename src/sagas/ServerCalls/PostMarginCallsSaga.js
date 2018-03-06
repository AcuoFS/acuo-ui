/**
 * Created by Rui on 12/10/17.
 */
import axios from 'axios'

import { POST_MARGIN_CALL_IDS } from '../../constants/APIcalls'

export const PostMarginCallsSaga = (referenceIDs) =>
  axios.post(POST_MARGIN_CALL_IDS,
    {"marginCallIds": referenceIDs, "clientId": window.localStorage.clientId},
    {
      withCredentials: false,
      headers: {'content-type': 'application/json'}
    }
    ).then(response => {
    // if(response.data.ok)
    return response.data
    // alert('request send margin call failed, try again')
  }).catch(error => {
      console.log(error)
      alert('request send margin call failed, try again')
    })
