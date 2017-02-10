import { connect } from 'react-redux'
import { GraphComponent } from '../components'
import { updateReconFilter } from '../actions'

const mapStateToProps = state => ({
  currentTime: state.mainReducer.getIn(['display', 'timeUpdated']),
  derivatives: state.mainReducer.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({
  onUnreconBubbleClick: (minTime, maxTime, timeRangeText) => {
    return dispatch(updateReconFilter({
      attr: 'time',
      selected: {
        label: timeRangeText.toUpperCase(),
        value: new Date(maxTime).getTime()
      }
    }))
  }
})

const GraphContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphComponent)

export default GraphContainer