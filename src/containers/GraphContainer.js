import { connect } from 'react-redux'
import { GraphComponent } from '../components'
import { updateReconFilter } from '../actions'

const mapStateToProps = state => ({
  derivatives: state.mainReducer.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({
  onUnreconBubbleClick: (minTime, maxTime, timeRangeText, status, direction) => {
    console.log(direction)
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
      })),
      dispatch(updateReconFilter({
        attr: 'direction',
        selected: {
          label: direction.toUpperCase(),
          value: direction
        }
      }))
  }
})

const GraphContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphComponent)

export default GraphContainer