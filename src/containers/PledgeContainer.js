import { connect } from 'react-redux'
import { PledgeComponent } from '../components'
import { initOptimisationSettings, updateOptimisationSettings } from '../actions'

const mapStateToProps = state => ({
  collateral : state.mainReducer.getIn(['pledgeData', 'collateral']),
  optimisation: state.PledgeReducer.getIn(['pledgeData', 'optimisation'])
})

const mapDispatchToProps = dispatch => ({
  onInitOptimisationSettings: (settings) => {
    dispatch(initOptimisationSettings(settings))
  },
  onUpdateOptimisationSettings: (newSettings) => {
    dispatch(updateOptimisationSettings(newSettings))
  }
})

const PledgeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgeComponent)

export default PledgeContainer