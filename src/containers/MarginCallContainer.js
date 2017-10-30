import {connect} from 'react-redux'
import {MarginCallComponent} from '../components'
import *  as MarginCallUploadActions from  '../actions/MarginCallUploadActions'
// import { POST_MARGIN_CALL_IDS } from './../constants/APIcalls'

const _default = ''
const _defaultArray = []

const mapStateToProps = state => ({
  uploadData: state.MarginUploadReducer.get('uploadData')
    ? state.MarginUploadReducer.get('uploadData').toJS() : _defaultArray,
  requestingValuation: state.MarginUploadReducer.get('requestingValuation') || _default,
  requestingMCGenerationOrValuation: state.MarginUploadReducer.get('requestingMCGenerationOrValuation') || _default
})

const checkUploadData = (data) => (data.length)

const mapDispatchToProps = dispatch => ({
  onGetMarginUploadData: (uploadData) => {
    dispatch(MarginCallUploadActions.getMarginCallUpload(uploadData))
  },
  onUpdateMarginCallUpload: (newTotalCallAmt, uploadId) => {
    dispatch(MarginCallUploadActions.updateMarginCallUpload(newTotalCallAmt, uploadId))
  },
  onPostMarginCallIDs: (idArr) => {
    // TODO: migrate to saga
    // console.log(idArr)
    // fetch(POST_MARGIN_CALL_IDS, {
    //   method: 'POST',
    //   body: JSON.stringify({"marginCallIds": idArr})
    // }).then(response => {
    //   alert('send success :' + JSON.stringify(idArr))
    //   return response.json()
    // }).then(obj => {
    //   return 1
    // }).catch(error => {
    //   console.log('Error: ' + error)
    // })
    dispatch(MarginCallUploadActions.updateRequestState(true))
    dispatch(MarginCallUploadActions.onRequestSendMarginCalls(idArr))

  },
  requestValuation: (referenceIDs) =>{
    dispatch(MarginCallUploadActions.updateRequestState(true))
    dispatch(MarginCallUploadActions.onRequestValuationAction(referenceIDs))
    // fetch('http://dev.acuo.com/valuation/acuo/api/calls/split/portfolios', {
    //   method: 'POST',
    //   body: JSON.stringify({"ids": referenceIDs}),
    //   headers: {'content-type': 'application/json'},
    //   json: true,
    //   resolveWithFullResponse: true
    // }).then(response => {
    //   if(response.ok)
    //     return response.json()
    //   alert('request valuation failed, try again')
    //   dispatch(MarginCallUploadActions.updateRequestState(false))
    // }).then(json => dispatch(MarginCallUploadActions.marginCallGenerated(json)))
    //   .catch(error => {
    //     console.log(error)
    //     alert('request valuation failed, try again')
    //     dispatch(MarginCallUploadActions.updateRequestState(false))
    //   })
  },
  generateMarginCalls: (referenceIDs) => {
    dispatch(MarginCallUploadActions.updateRequestState(true))
    dispatch(MarginCallUploadActions.onRequestGenerateMarginCall(referenceIDs))
  //   fetch('http://dev.acuo.com/valuation/acuo/api/calls/generate/portfolios', {
  //     method: 'POST',
  //     body: JSON.stringify({"ids": referenceIDs}),
  //     headers: {'content-type': 'application/json'},
  //     json: true,
  //     resolveWithFullResponse: true
  //   }).then(response => {
  //     if(response.ok)
  //       return response.json()
  //     alert('generate margin call failed, try again')
  //     dispatch(MarginCallUploadActions.updateRequestState(false))
  //   }).then(json => dispatch(MarginCallUploadActions.marginCallGenerated(json)))
  //     .catch(error => {
  //       console.log(error)
  //       alert('generate margin call failed, try again')
  //       dispatch(MarginCallUploadActions.updateRequestState(false))
  //     })
  }
})

const mergeProps = (stateProps, dispatchProps) => ({
  uploadDataFlag: checkUploadData(stateProps.uploadData),
  onRequestValuation: () => {
    // dispatchProps.requestValuation(stateProps.txnID)

   },
  ...stateProps, ...dispatchProps
})

const MarginCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MarginCallComponent)

export default MarginCallContainer
