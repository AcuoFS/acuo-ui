/**
 * https://www.w3schools.com/howto/howto_css_switch.asp
 */

import React, {PropTypes} from 'react'
import styles from './ToggleSwitch.css'


const ToggleSwitch = ({propIsOn, propOnToggle}) => {
  return (
      <label className={styles.switch}>
        <input type="checkbox" defaultChecked={propIsOn}
               onClick={() => propOnToggle()}/>
        <div className={styles.slider + ' ' + styles.round}></div>
        <span className={styles.on}>On</span>
        <span className={styles.off}>Off</span>
      </label>
  )
}

ToggleSwitch.PropTypes = {
  propIsOn: PropTypes.bool.isRequired,
  propOnToggle: PropTypes.func.isRequired
}

export default ToggleSwitch
