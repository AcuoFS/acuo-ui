import has from 'lodash/has'

export const FetchMarginCall = (txnID) => {
  return fetch('http://valuation.acuo.com/acuo/api/calls/async/generate/' + txnID).then(response => {
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