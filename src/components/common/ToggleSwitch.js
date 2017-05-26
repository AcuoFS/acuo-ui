/**
 * https://www.w3schools.com/howto/howto_css_switch.asp
 */

import React from 'react';
import PropTypes from 'prop-types'
import styles from './ToggleSwitch.css'


const ToggleSwitch = ({propIsOn, propOnToggle}) => {
  return (
      <label className={styles.switch}>
        <input type="checkbox" checked={propIsOn}
               onChange={() => propOnToggle()}/>
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
