import React from 'react'
import Notifications from 'react-notification-system-redux'

const NotificationComponent = props => (
  <div>
    <Notifications notifications={props.notifications}/>
  </div>
)


export default NotificationComponent