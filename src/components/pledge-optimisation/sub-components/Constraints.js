import React from 'react'
import {checkBox, checkBoxWithTick} from '../../../../images/common'
import {
  CONSTRAINTS_MIN,
  CONSTRAINTS_MAX,
  STATE_MAX_MOVEMENTS,
  STATE_EXCLUDE_DAYS,
  DEFAULT_MOVEMENTS
} from'../OptimisationWidget'
import styles from './Constraints.css'


const isWithinRange = (number, max, min) => {
  return (number <= max) && (number >= min)
}

const createInputWithPlusMinus = (stateProperty, propGetStateProperty,
                                  propSetStatePropertyWithValue, max, min) => {

  const numberMinusOne = Number(propGetStateProperty(stateProperty)) - 1
  const numberPlusOne = Number(propGetStateProperty(stateProperty)) + 1

  return <div className={styles.flexColumnWrap}>
    <div className={styles.flexWrap}>
      <div className={styles.plusMinusWrap}
           onClick={() => isWithinRange(numberMinusOne, max, min) &&
           propSetStatePropertyWithValue(stateProperty, numberMinusOne)}> -
      </div>
      <input type="number" min={CONSTRAINTS_MIN} max={CONSTRAINTS_MAX}
             className={styles.constraintsNumberBox} value={propGetStateProperty(stateProperty)}
             onChange={(e) => isWithinRange(e.target.value, max, min) &&
             propSetStatePropertyWithValue(stateProperty, e.target.value)}/>
      <div className={styles.plusMinusWrap}
           onClick={() => isWithinRange(numberPlusOne, max, min) &&
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
                       propIsAllocateClicked,
                       propMovementsFromOpt
                     }) => (
  <div className={styles.componentWrap}>
    <div>
      <div className={styles.constraintsSection}>
        <div className={styles.flexWrap}>

          <div className={styles.lineWithoutFlex}>
            {createInputWithPlusMinus(DEFAULT_MOVEMENTS, propGetStateProperty,
              propSetStatePropertyWithValue, CONSTRAINTS_MAX, CONSTRAINTS_MIN)}
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
            propSetStatePropertyWithValue, CONSTRAINTS_MAX, CONSTRAINTS_MIN)}

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
                 value={propMovementsFromOpt}/>
          <div className={styles.plusMinusWrap}/>
          <div className={styles.textWrap}>Movements based on Optimization</div>
        </div>
      </div>
      <div className={styles.horizontalLine}/>
    </div>

  </div>)

export default Constraints