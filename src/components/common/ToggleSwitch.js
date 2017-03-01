/**
 * https://www.w3schools.com/howto/howto_css_switch.asp
 */

import React from 'react'
import styles from './ToggleSwitch.css'


const ToggleSwitch = ({propIsOn, propOnToggle}) => {
  return (
    <label className={styles.switch}>
      <input type="checkbox" defaultChecked={propIsOn}
             onClick={() => propOnToggle()}/>
      <div className={styles.slider + ' ' + styles.round}></div>
    </label>
  )
}

export default ToggleSwitch
