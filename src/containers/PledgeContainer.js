import { connect } from 'react-redux'
import { PledgeComponent } from '../components'
import { initOptimisationSettings } from '../actions'

const mapStateToProps = state => ({
  collateral : state.mainReducer.getIn(['pledgeData', 'collateral']),
  optimisation: state.PledgeReducer.getIn(['pledge-data', 'optimisation'])
})

const mapDispatchToProps = dispatch => ({
  onInitOptimisationSettings: (settings) => {
    initOptimisationSettings(settings)
  }
})

const PledgeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgeComponent)

export default PledgeContainer