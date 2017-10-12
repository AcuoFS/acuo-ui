import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import styles from './NavigationBar.css'

const NavigationBarItem = (props) => (
  <div className={styles.pageTitle}>

    <Link to={props.toUrl}>
      <div className={styles.menuItem}>
          <div className={(props.selected ? styles.boldThis : '')}>
            {props.label}
            { props.notifications &&
            props.notifications.reduce((sum, item) => item ? sum + item.alerts : sum , 0) > 0 &&
            <div className={styles.notificationBadge}>
              {props.notifications.reduce((sum, item) => sum + item.alerts, 0)}
            </div>
            }
          </div>
      </div>
    </Link>

  </div>
)

NavigationBarItem.propTypes = {
  toUrl: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  selected: React.PropTypes.bool
}

NavigationBarItem.defaultProps = {
  selected: false
}

export default NavigationBarItem