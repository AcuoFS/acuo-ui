/**
 * Created by Rui on 31/10/17.
 */
import React from 'react'
import _ from 'lodash'

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
    const { options,
      onVariableClick, onToggleAll } = this.props

    return <div>
      <div className={styles.variableCheckboxContainer} onClick={this.toggle} onMouseLeave={this.leaveToggle}>
        <div className={styles.checkboxArrowContainer}>
          <img className={styles.checkboxImg} src={checkBox} onClick={(e) => {e.stopPropagation(); onToggleAll()}}/>
          <div className={styles.arrow}></div>
        </div>
        <div className={styles.list}>
        { this.state.open && _.map(options,
          (x, i) => <div key={i} className={styles.listItem} onClick={() => onVariableClick(x.has, x.dontHave)}>
              {x.label}
            </div>
          )
        }
        </div>
      </div>
    </div>
  }
}

export default VariableCheckbox