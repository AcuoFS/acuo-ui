import { NotificationComponent } from './../components'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    notifications: state.NotificationReducer
  }
}

const NotificationContainer = connect(
  mapStateToProps
)(NotificationComponent)

export default NotificationContainer
