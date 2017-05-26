import {connect} from 'react-redux'
import {NavigationBarComponent} from '../components'

const _default = []

const mapStateToProp = state => {
  return {
    timeUpdated: state.mainReducer.getIn(['display', 'timeUpdated']),
    menuNotifications: state.mainReducer.getIn(['display', 'menu', 'alerts']).toJS() || _default
  }
}

const mapDispatchToProps = dispatch => ({})

const NavigationBarContainer = connect(
  mapStateToProp,
  mapDispatchToProps
)(NavigationBarComponent)

export default NavigationBarContainer

