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
    dispatch(MarginCallUploadActions.updateMarginCallUpload(newTotalCallAmt,uploadId))
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
  }
})

const mergeProps = (stateProps, dispatchProps) => ({
  uploadDataFlag: checkUploadData(stateProps.uploadData),
  ...stateProps, ...dispatchProps
})

const MarginCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MarginCallComponent)

export default MarginCallContainer
