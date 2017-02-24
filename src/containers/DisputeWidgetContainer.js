import {connect} from 'react-redux'
import {DisputeWidgetComponent} from './../components'
import * as DISPUTE_ACTION from '../actions/DisputeActions'


const mapStateToProps = state => ({
  disputeData: state.DisputeReducer.get('disputeData').toJS(),
  disputeFilter: state.DisputeReducer.get('disputeFilter')
})

const mapDispatchToProps = dispatch => ({
  onInitDisputeData: (disputeData) => {
    dispatch(DISPUTE_ACTION.initDispute(disputeData))
  },
  onUpdateDisputeFilter: (disputeFilter) => {
    dispatch(DISPUTE_ACTION.updateDisputeFilter(disputeFilter))
  }
})

const DisputeWidgetContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisputeWidgetComponent)

export default DisputeWidgetContainer