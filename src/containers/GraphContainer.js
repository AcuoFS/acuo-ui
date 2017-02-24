import { connect } from 'react-redux'
import { GraphComponent } from '../components'
import { updateReconFilter } from '../actions'

const mapStateToProps = state => ({
  currentTime: state.mainReducer.getIn(['display', 'timeUpdated']),
  derivatives: state.mainReducer.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({
  onUnreconBubbleClick: (minTime, maxTime, timeRangeText, status) => {
    return dispatch(updateReconFilter({
      attr: 'notificationTime',
      selected: {
        label: timeRangeText.toUpperCase(),
        value: new Date(minTime).getTime()
      }
    })),
      dispatch(updateReconFilter({
        attr: 'status',
        selected: {
          label: status.toUpperCase(),
          value: status
        }
      }))
  }
})

const GraphContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphComponent)

export default GraphContainer