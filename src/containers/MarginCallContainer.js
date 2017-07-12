import {connect} from 'react-redux'
import {MarginCallComponent} from '../components'
import *  as MarginCallUploadActions from  '../actions/MarginCallUploadActions'
import { POST_MARGIN_CALL_IDS } from './../constants/APIcalls'

const _default = ''
const _defaultArray = []

const mapStateToProps = state => ({
  uploadData: state.MarginUploadReducer.get('uploadData')
    ? state.MarginUploadReducer.get('uploadData').toJS() : _defaultArray,
  requestingValuation: state.MarginUploadReducer.get('requestingValuation') || _default
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
    fetch(POST_MARGIN_CALL_IDS, {
      method: 'POST',
      body: JSON.stringify(idArr)
    }).then(response => {
      alert('send success :' + JSON.stringify(idArr))
      return response.json()
    }).then(obj => {
      return 1
    }).catch(error => {
      console.log('Error: ' + error)
    })
  },
  requestValuation: (referenceIDs) =>{
    // dispatch(pollMarginCall(txnID))
    // dispatch(requestingValuationFlag())
    // console.log(referenceIDs)
    fetch('http://dev.acuo.com/valuation/acuo/api/calls/split/portfolios', {
      method: 'POST',
      body: JSON.stringify({"ids": referenceIDs}),
      headers: {'content-type': 'application/json'},
      json: true,
      resolveWithFullResponse: true
    }).then(response => response.json())
      .then(json => dispatch(MarginCallUploadActions.marginCallGenerated(json)))
  },
  generateMarginCalls: (referenceIDs) =>{
    // dispatch(pollMarginCall(txnID))
    // dispatch(requestingValuationFlag())
    // console.log(referenceIDs)
    fetch('http://dev.acuo.com/valuation/acuo/api/calls/generate/portfolios', {
      method: 'POST',
      body: JSON.stringify({"ids": referenceIDs}),
      headers: {'content-type': 'application/json'},
      json: true,
      resolveWithFullResponse: true
    }).then(response => response.json())
      .then(json => dispatch(MarginCallUploadActions.marginCallGenerated(json)))
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
