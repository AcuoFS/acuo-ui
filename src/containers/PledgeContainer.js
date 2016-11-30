import { connect } from 'react-redux'
import { PledgeComponent } from '../components'
import { initOptimisationSettings, updateOptimisationSettings, initSelection } from '../actions'

const mapStateToProps = state => ({
  collateral : state.PledgeReducer.getIn(['pledgeData', 'collateral']),
  optimisation: state.PledgeReducer.getIn(['pledgeData', 'optimisation']),
  selection: state.PledgeReducer.getIn(['pledgeData', 'selection'])
})

const mapDispatchToProps = dispatch => ({
  onInitOptimisationSettings: (settings) => {
    dispatch(initOptimisationSettings(settings))
  },
  onUpdateOptimisationSettings: (newSettings) => {
    dispatch(updateOptimisationSettings(newSettings))
  },
  initSelection: (selection) => {
    dispatch(initSelection(selection))
  }
})

const PledgeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgeComponent)

export default PledgeContainer