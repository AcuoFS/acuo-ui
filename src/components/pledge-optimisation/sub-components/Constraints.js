import React from 'react'
import {checkBox, checkBoxWithTick} from '../../../../images/common'
import styles from './Constraints.css'


const CONSTRAINTS_MIN = 0
const CONSTRAINTS_MAX = 999
const STATE_MAX_MOVEMENTS = 'maxMovements'
const STATE_EXCLUDE_DAYS = 'excludeDays'

export default class Constraints extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      [STATE_MAX_MOVEMENTS]: CONSTRAINTS_MAX,
      [STATE_EXCLUDE_DAYS]: CONSTRAINTS_MIN,
      isFungible: false
    }
  }

  isWithinRange(number) {
    return (number <= CONSTRAINTS_MAX) && (number >= CONSTRAINTS_MIN)
  }

  createInputWithPlusMinus(stateProperty) {
    return <div className={styles.flexColumnWrap}>
      <div className={styles.flexWrap}>
        <div className={styles.plusMinusWrap}
             onClick={() => this.isWithinRange(--this.state[stateProperty]) &&
             this.setState({[stateProperty]: --this.state[stateProperty]})}> -
        </div>
        <input type="number" min={CONSTRAINTS_MIN} max={CONSTRAINTS_MAX}
               className={styles.constraintsNumberBox} value={this.state[stateProperty]}
               onChange={(e) => this.isWithinRange(e.target.value) &&
               this.setState({[stateProperty]: e.target.value})}/>
        <div className={styles.plusMinusWrap}
             onClick={() => this.isWithinRange(++this.state[stateProperty]) &&
             this.setState({[stateProperty]: ++this.state[stateProperty]})}> +
        </div>
      </div>
      <div/>
    </div>

  }

  render() {
    return <div className={styles.componentWrap}>
      <div className={styles.constraintsSection}>
        <div className={styles.flexWrap}>

          <div className={styles.lineWithoutFlex}>
            {this.createInputWithPlusMinus(STATE_MAX_MOVEMENTS)}
          </div>

          <div className={styles.flexColumnWrap}>
            <div className={styles.line + ' ' + styles.textWrap}>Maximum movements for each statement</div>
            <div className={styles.line}><img src={this.state.isFungible ? checkBoxWithTick : checkBox}
                                              className={styles.checkboxWrap}
                                              onClick={() => this.setState({isFungible: !this.state.isFungible})}/>
              <div className={styles.textWrap}>Fungible</div>
            </div>
          </div>

        </div>


      </div>
      <hr/>
      <div className={styles.constraintsSection}>
        <div className={styles.line}>
          <div className={styles.textWrap}>Exclude assets with corporate actions within the next</div>
        </div>

        <div className={styles.line}>

          {this.createInputWithPlusMinus(STATE_EXCLUDE_DAYS)}

          <div className={styles.textWrap}>days</div>
        </div>

      </div>
      <hr/>
      <div className={styles.constraintsSection}>
        <div className={styles.line}>
          <div className={styles.plusMinusWrap}/>
          <input type="number" className={styles.constraintsNumberBoxDisabled} readOnly value={76}/>
          <div className={styles.plusMinusWrap}/>
          <div className={styles.textWrap}>Movements based on Optimization</div>
        </div>

      </div>
      <hr/>
    </div>
  }
}