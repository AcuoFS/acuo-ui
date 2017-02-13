import {connect} from 'react-redux'
import {MarginCallComponent} from '../components'
import *  as MarginCallUploadActions from  '../actions/MarginCallUploadActions'


const mapStateToProps = state => ({
  uploadData: state.MarginUploadReducer.get('uploadData')
    ? state.MarginUploadReducer.get('uploadData').toJS() : []
})

const mapDispatchToProps = dispatch => ({
  onGetMarginUploadData: (uploadData) => {
    dispatch(MarginCallUploadActions.getMarginCallUpload(uploadData))
  },
  onUpdateMarginCallUpload: (newTotalCallAmt, uploadId) => {
    dispatch(MarginCallUploadActions.updateMarginCallUpload(newTotalCallAmt,uploadId))
  }
})

const MarginCallContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MarginCallComponent)

export default MarginCallContainer
