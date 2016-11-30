import { connect } from 'react-redux'
import { PledgeComponent } from '../components'
import { initOptimisationSettings } from '../actions'

const mapStateToProps = state => ({
  collateral : state.mainReducer.getIn(['pledgeData', 'collateral']),
  optimisation: state.PledgeReducer.getIn(['pledgeData', 'optimisation'])
})

const mapDispatchToProps = dispatch => ({
  onInitOptimisationSettings: (settings) => {
    dispatch(initOptimisationSettings(settings))
  }
})

const PledgeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgeComponent)

export default PledgeContainer