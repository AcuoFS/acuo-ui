import { connect } from 'react-redux'
import { UploadWidgetComponent } from '../components'
import {
  updateTxnID,
  pollMarginCall,
  requestingValuationFlag
} from '../actions/MarginCallUploadActions'

const _default = ''

const mapStateToProps = state => ({
  txnID: state.MarginUploadReducer.get('txnID') || _default
})

const mapDispatchToProps = dispatch => ({
  onUpdateTxnID: (txnID) =>
    dispatch(updateTxnID(txnID))
  ,
  requestValuation: (txnID) =>{
    console.log('fired')
    dispatch(pollMarginCall(txnID))
    dispatch(requestingValuationFlag())
  }
})

const mergeProps = (stateProps, dispatchProps) => ({
  onRequestValuation: () => {
    console.log('fire')
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