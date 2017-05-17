import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import styles from './NavigationBar.css'

const NavigationBarItem = (props) => (
  <div className={styles.pageTitle}>
    <div className={styles.vertiCenter}>
      <div className={styles.centerThis}>
        <Link to={props.toUrl}>
          <div className={styles.menuItem}>
            <div className={styles.vertiCenter}>
              <p className={styles.centerThis
              + (props.selected ? ' ' + styles.boldThis : '')}>
                {props.label}
              </p>
              { props.notifications &&
                props.notifications.alerts > 0 &&
                <div className={styles.notificationBadge}>
                  {props.notifications.alerts}
                </div>
              }
            </div>
          </div>
        </Link>
      </div>
    </div>
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