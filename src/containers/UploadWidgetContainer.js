import { connect } from 'react-redux'
import { UploadWidgetComponent } from '../components'
import {
  updateTxnID,
  pollMarginCall,
  requestingValuationFlag,
  uploadingPortfolioFlag
} from '../actions/MarginCallUploadActions'

const _default = ''

const mapStateToProps = state => ({
  txnID: state.MarginUploadReducer.get('txnID') || _default,
  uploading: state.MarginUploadReducer.get('uploading'),
  requestingValuation: state.MarginUploadReducer.get('requestingValuation'),
})

const mapDispatchToProps = dispatch => ({
  onUpdateTxnID: (txnID) =>
    dispatch(updateTxnID(txnID))
  ,
  requestValuation: (txnID) =>{
    dispatch(pollMarginCall(txnID))
    dispatch(requestingValuationFlag())
  },
  flagUploading: () =>
    dispatch(uploadingPortfolioFlag())
})

const mergeProps = (stateProps, dispatchProps) => ({
  onRequestValuation: () => {
    dispatchProps.requestValuation(stateProps.txnID)
  }
  , ...stateProps, ...dispatchProps
})

const UploadWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UploadWidgetComponent)

export default UploadWidgetContainer