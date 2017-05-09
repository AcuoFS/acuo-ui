import React from 'react'
import styles from './LoadingBarSpinner.css'

const LoadingBarSpinner = ({text}) => (
  <div>
    <div className={styles.loadingText}>
      {text}
    </div>
    <div className={styles.loadingBar}>
      <div className={styles.spinner}></div>
    </div>
  </div>
)

export default LoadingBarSpinner