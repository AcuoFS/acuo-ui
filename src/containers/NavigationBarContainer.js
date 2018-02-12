import {connect} from 'react-redux'
import { hashHistory } from 'react-router'

import {NavigationBarComponent} from '../components'
import {
  sagaNavbarAlerts,
  defaultChatOpen
} from './../actions/CommonActions'
import {
  doLogout
} from './../actions/LoginActions'

const _default = []

const mapStateToProp = state => {
  return {
    timeUpdated: state.mainReducer.getIn(['display', 'timeUpdated']),
    menuNotifications: state.CommonReducer.get('alerts').toJS() || _default,
    email: window.localStorage.getItem('acuoEmail')
  }
}

const mapDispatchToProps = dispatch => ({
  onUpdateNavbarAlert: () => dispatch(sagaNavbarAlerts()),
  onChatOpen: () => dispatch(defaultChatOpen()),
  doLogout: () => dispatch(doLogout())
})

const NavigationBarContainer = connect(
  mapStateToProp,
  mapDispatchToProps
)(NavigationBarComponent)

export default NavigationBarContainer

