import React from 'react'
import styles from './AppWrapper.css'

const AppWrapper = (props) => (
  <div className={styles.blurWrapper}>
    <svg className={styles.blurSvg}>
      <defs>
        <filter id="blur-filter">
          <feGaussianBlur stdDeviation="10"></feGaussianBlur>
        </filter>
      </defs>
    </svg>
    <div className={styles.blurrer + ' ' + (!props.noPrompt ? '' : styles.blur)}>
      {props.children}
    </div>
    {props.noPrompt &&
      <div className={styles.popup}>
        ACUO is best viewed on a larger screen
      </div>
    }
  </div>
)

export default AppWrapper