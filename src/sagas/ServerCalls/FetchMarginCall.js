/***
 * UNUSED
 */

import has from 'lodash/has'
import { FETCH_GENERATED_PORTFOLIO } from '../../constants/APIcalls'

export const FetchMarginCall = (txnID) => {
  return fetch(FETCH_GENERATED_PORTFOLIO + txnID).then(response => {
    if(response.ok)
      return response.json()
    else
      return ['failed', []]
  }).then(json => {
    if(has(json, 'uploadMarginCallDetails'))
      return ['passed', json.uploadMarginCallDetails]
    else
      return ['failed', []]
  })
}