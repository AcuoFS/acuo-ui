import React from 'react'
import {checkBox, checkBoxWithTick} from '../../../../images/common'
import {
  CONSTRAINTS_MIN,
  CONSTRAINTS_MAX,
  STATE_MAX_MOVEMENTS,
  STATE_EXCLUDE_DAYS
} from'../OptimisationWidget'
import styles from './Constraints.css'


const isWithinRange = (number) => {
  return (number <= CONSTRAINTS_MAX) && (number >= CONSTRAINTS_MIN)
}

const createInputWithPlusMinus = (stateProperty,
                                  propGetStateProperty,
                                  propSetStatePropertyWithValue) => {

  const numberMinusOne = Number(propGetStateProperty(stateProperty)) - 1
  const numberPlusOne = Number(propGetStateProperty(stateProperty)) + 1

  return <div className={styles.flexColumnWrap}>
    <div className={styles.flexWrap}>
      <div className={styles.plusMinusWrap}
           onClick={() => isWithinRange(numberMinusOne) &&
           propSetStatePropertyWithValue(stateProperty, numberMinusOne)}> -
      </div>
      <input type="number" min={CONSTRAINTS_MIN} max={CONSTRAINTS_MAX}
             className={styles.constraintsNumberBox} value={propGetStateProperty(stateProperty)}
             onChange={(e) => isWithinRange(e.target.value) &&
             propSetStatePropertyWithValue(stateProperty, e.target.value)}/>
      <div className={styles.plusMinusWrap}
           onClick={() => isWithinRange(numberPlusOne) &&
           propSetStatePropertyWithValue(stateProperty, numberPlusOne)}> +
      </div>
    </div>
    <div/>
  </div>
}

const Constraints = ({
                       propIsFungible,
                       propHandlerToggleFungible,
                       propGetStateProperty,
                       propSetStatePropertyWithValue,
                       propIsAllocateClicked
                     }) => (
  <div className={styles.componentWrap}>
    <div>
      <div className={styles.constraintsSection}>
        <div className={styles.flexWrap}>

          <div className={styles.lineWithoutFlex}>
            {createInputWithPlusMinus(STATE_MAX_MOVEMENTS, propGetStateProperty,
              propSetStatePropertyWithValue)}
          </div>

          <div className={styles.flexColumnWrap}>
            <div className={styles.line + ' ' + styles.textWrap}>Maximum movements for each statement</div>
            <div className={styles.line + ' ' + styles.textWrap}>
              <img src={propIsFungible ? checkBoxWithTick : checkBox}
                   className={styles.checkboxWrap}
                   onClick={() => propHandlerToggleFungible()}/>
              <div>Fungible</div>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.horizontalLine}/>
    </div>

    <div>
      <div className={styles.constraintsSection}>
        <div className={styles.line}>
          <div className={styles.textWrap}>Exclude assets with corporate actions within the next</div>
        </div>

        <div className={styles.line}>

          {createInputWithPlusMinus(STATE_EXCLUDE_DAYS, propGetStateProperty,
            propSetStatePropertyWithValue)}

          <div className={styles.textWrap}>days</div>
        </div>

      </div>

      <div className={styles.horizontalLine}/>
    </div>

    <div>
      <div className={styles.constraintsSection}>
        <div className={styles.line}>
          <div className={styles.plusMinusWrap}/>
          <input type="number" className={styles.constraintsNumberBoxDisabled} readOnly
                 value={propIsAllocateClicked ? 76 : ''}/>
          <div className={styles.plusMinusWrap}/>
          <div className={styles.textWrap}>Movements based on Optimization</div>
        </div>
      </div>
      <div className={styles.horizontalLine}/>
    </div>

  </div>)

export default Constraints