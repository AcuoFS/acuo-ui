/**
 * Created by Rui on 12/10/17.
 */
import { POST_MARGIN_CALL_IDS } from '../../constants/APIcalls'

export const PostMarginCallsSaga = (referenceIDs) =>
  fetch(POST_MARGIN_CALL_IDS, {
    method: 'POST',
    body: JSON.stringify({"marginCallIds": referenceIDs, "clientId": window.localStorage.clientID}),
    headers: {'content-type': 'application/json'},
    json: true,
    resolveWithFullResponse: true
  }).then(response => {
    if(response.ok)
      return response.json()
    alert('request send margin call failed, try again')
  }).then(json => json)
    .catch(error => {
      console.log(error)
      alert('request send margin call failed, try again')
    })
