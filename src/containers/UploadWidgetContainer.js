import { connect } from 'react-redux'
import { UploadWidgetComponent } from '../components'
import {
  updateTxnID,
  pollMarginCall
} from '../actions/MarginCallUploadActions'

const _default = ''

const mapStateToProps = state => ({
  tnxID: state.MarginUploadReducer.get('tnxID') || _default
})

const mapDispatchToProps = dispatch => ({
  onUpdateTxnID: (txnID) =>
    dispatch(updateTxnID(txnID))
  ,
  requestValuation: (txnID) =>
    dispatch(pollMarginCall(txnID))
})

const mergeProps = (stateProps, dispatchProps) => ({
  onRequestValuation: () =>
    dispatchProps.requestValuation(stateProps.txnID)
  , ...stateProps, ...dispatchProps
})

const UploadWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(UploadWidgetComponent)

export default UploadWidgetContainer