/**
 * Created by Rui on 28/7/17.
 */

import { REQUEST_VALUATION_URL } from '../../constants/APIcalls'

export const RequestValuationSaga = (referenceIDs) =>
  fetch(REQUEST_VALUATION_URL, {
    method: 'POST',
    body: JSON.stringify({"ids": referenceIDs}),
    headers: {'content-type': 'application/json'},
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    if(response.ok)
      return response.json()
    alert('request valuation failed, try again')
    //dispatch(MarginCallUploadActions.updateRequestState(false))
  }).then(json => json)
    .catch(error => {
      console.log(error)
      alert('request valuation failed, try again')
    })
