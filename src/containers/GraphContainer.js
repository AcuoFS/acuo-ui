import { connect } from 'react-redux'
import { GraphComponent } from '../components'
import { filterTimeWindowStatus } from '../actions'

const mapStateToProps = state => ({
  currentTime: state.mainReducer.getIn(['display', 'timeUpdated']),
  derivatives: state.mainReducer.getIn(['display', 'derivatives'])
})

const mapDispatchToProps = dispatch => ({
  onUnreconBubbleClick: (minTime, maxTime, timeRangeText) => {
    dispatch(filterTimeWindowStatus(new Date(minTime).getTime(), new Date(maxTime).getTime(), timeRangeText))
  }
})

const GraphContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphComponent)

export default GraphContainer