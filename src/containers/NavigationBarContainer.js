import {connect} from 'react-redux'
import {NavigationBarComponent} from '../components'

const mapStateToProp = state => {
  return {
    timeUpdated: state.mainReducer.getIn(['display', 'timeUpdated'])
  }
}

const mapDispatchToProps = dispatch => ({})

const NavigationBarContainer = connect(
  mapStateToProp,
  mapDispatchToProps
)(NavigationBarComponent)

export default NavigationBarContainer

