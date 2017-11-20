import { connect } from 'react-redux'
import { GraphComponent } from '../components'
import {
  updateReconFilter,
  updatePledgeFilter,
  updateSelectedCurrency
} from '../actions'

const mapStateToProps = state => ({
  derivatives: state.mainReducer.getIn(['display', 'derivatives']),
  currency: state.CommonReducer.get('currencyInfo').toList().toJS(),
  selectedCurrency: state.mainReducer.get('selectedCurrency')
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
  },
  onReconBubbleClick: (minTime) => dispatch(updatePledgeFilter({
    attr: 'notificationTime',
    selected: {
      label: new Date(minTime).getTime(),
      value: new Date(minTime).getTime()
    }
  })),
  onUpdateSelectedCurrency: (currency) => dispatch(updateSelectedCurrency(currency))
})

const GraphContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphComponent)

export default GraphContainer