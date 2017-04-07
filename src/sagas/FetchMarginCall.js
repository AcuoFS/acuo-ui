import has from 'lodash/has'

export const FetchMarginCall = (txnID) => {
  // console.log('txnID: ' + txnID)
  return fetch('http://valuation.acuo.com/acuo/api/calls/async/generate/' + txnID).then(response => {
    if(response.ok)
      return response.json()
    else
      return ['failed', []]
  }).then(json => {
    // console.log(json)
    // console.log(has(json, 'uploadMarginCallDetails'))
    // console.log(json.uploadMarginCallDetails)

    if(has(json, 'uploadMarginCallDetails'))
      return ['passed', json.uploadMarginCallDetails]
    else
      return ['failed', []]
  })
}