import { connect } from 'react-redux'
import { UploadWidgetComponent } from '../components'
import {
  updateTxnID,
  pollMarginCall
} from '../actions/MarginCallUploadActions'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  onUpdateTxnID: (txnID) =>
    Promise.resolve(dispatch(updateTxnID(txnID)))
      .then(response => dispatch(pollMarginCall(txnID)))
})

const UploadWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadWidgetComponent)

export default UploadWidgetContainer