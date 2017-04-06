export const FetchMarginCall = (txnID) => {
  console.log('txnID: ' + txnID)
  return fetch('http://valuation.acuo.com/acuo/api/calls/generate/' + txnID)
}