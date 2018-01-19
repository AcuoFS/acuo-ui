/**
 * Created by Rui on 31/7/17.
 */

import { REQUEST_GENERATE_MARGIN_CALLS } from '../../constants/APIcalls'

export const GenerateMarginCallSaga = (referenceIDs) =>
  fetch(REQUEST_GENERATE_MARGIN_CALLS, {
    method: 'POST',
    body: JSON.stringify({"ids": referenceIDs, clientID: window.localStorage.clientID}),
    headers: {'content-type': 'application/json'},
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    if(response.ok)
      return response.json()
    alert('request generate margin call failed, try again')
    //dispatch(MarginCallUploadActions.updateRequestState(false))
  }).then(json => json)
    .catch(error => {
      console.log(error)
      alert('request generate margin call failed, try again')
    })
