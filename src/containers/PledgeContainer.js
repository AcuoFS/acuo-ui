import { connect } from 'react-redux'
import { PledgeComponent } from '../components'

const mapStateToProps = state => ({

  collateral : state.getIn(['pledgeData', 'collateral'])
})

const mapDispatchToProps = dispatch => ({

})

const PledgeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PledgeComponent)

export default PledgeContainer