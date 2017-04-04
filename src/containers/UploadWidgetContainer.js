import { connect } from 'react-redux'
import { UploadWidgetComponent } from '../components'
import {
  updateTxnID
} from '../actions/MarginCallUploadActions'

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  onUpdateTxnID: (txnID) => dispatch(updateTxnID(txnID)).then((response) => dispatch('FETCH_MARGIN_CALL'))
})

const UploadWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadWidgetComponent)

export default UploadWidgetContainer