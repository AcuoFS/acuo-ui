/**
 * Created by Rui on 31/10/17.
 */
import React from 'react'

import styles from './VariableCheckbox.css'
import {
  checkBox,
  checkBoxWithTick,
  minuxBox
} from '../../../../images/common'

class VariableCheckbox extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false
    }

    this.toggle = this.toggle.bind(this)
    this.leaveToggle = this.leaveToggle.bind(this)
  }

  leaveToggle() {
    this.setState({
      open: false
    })
  }

  toggle(){
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return <div>
      <div className={styles.variableCheckboxContainer} onClick={this.toggle} onMouseLeave={this.leaveToggle}>
        <div className={styles.checkboxArrowContainer}>
          <img className={styles.checkboxImg} src={checkBox} />
          <div className={styles.arrow}></div>
        </div>
        { this.state.open && <div className={styles.list}>
          <div className={styles.listItem}>
            All
          </div>
          <div className={styles.listItem}>
            None
          </div>
          <div className={styles.listItem}>
            Incomplete Val
          </div>
          <div className={styles.listItem}>
            No Calls generated
          </div>
          <div className={styles.listItem}>
            Calls generated
          </div>
        </div> }
      </div>
    </div>
  }
}

export default VariableCheckbox