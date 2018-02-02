import {connect} from 'react-redux'
import {NavigationBarComponent} from '../components'
import {
  sagaNavbarAlerts,
  defaultChatOpen
} from './../actions/CommonActions'

const _default = []

const mapStateToProp = state => {
  return {
    timeUpdated: state.mainReducer.getIn(['display', 'timeUpdated']),
    menuNotifications: state.CommonReducer.get('alerts').toJS() || _default,
    email: state.CommonReducer.get('email')
  }
}

const mapDispatchToProps = dispatch => ({
  onUpdateNavbarAlert: () => dispatch(sagaNavbarAlerts()),
  onChatOpen: () => dispatch(defaultChatOpen())
})

const NavigationBarContainer = connect(
  mapStateToProp,
  mapDispatchToProps
)(NavigationBarComponent)

export default NavigationBarContainer

