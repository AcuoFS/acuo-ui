import React from 'react'
import Dropdown from '../../Dropdown/Dropdown'
import {formatDate} from '../../../utils'
import styles from './TradingEntities.css'


const toggleDropDown = (e) => {
}

const onDropdownItemChange = (e) => {
}

const TradingEntities = (props) => (
  <div className={styles.createContent}>
    <div className={styles.rowGroup}>
      <div className={styles.line}>Our Legal Entity</div>
      <div className={styles.line}>
        <div className={styles.dropDown}>
          <Dropdown
            handlerOnClick={toggleDropDown}
            handleOnSelectedItemChange={onDropdownItemChange}
            selectedOption={'Acuo'}
            options={['Acuo', 'Palo IT']}
            activateMouseLeaveEvent/>
        </div>
      </div>
    </div>
    <div className={styles.rowGroup}>
      <div className={styles.line}>Counterparty Organization</div>
      <div className={styles.line}>
        <div className={styles.dropDown}>
          <Dropdown
            handlerOnClick={toggleDropDown}
            handleOnSelectedItemChange={onDropdownItemChange}
            selectedOption={'Counterparty A'}
            options={['Counterparty A', 'Counterparty B']}
            activateMouseLeaveEvent/>
        </div>
      </div>
    </div>
    <div className={styles.rowGroup}>
      <div className={styles.line}>Counterparty Entity</div>
      <div className={styles.line}>
        <div className={styles.dropDown}>
          <Dropdown
            handlerOnClick={toggleDropDown}
            handleOnSelectedItemChange={onDropdownItemChange}
            selectedOption={'Counterparty A1'}
            options={['Counterparty A1', 'Counterparty A7']}
            activateMouseLeaveEvent/>
        </div>
      </div>
    </div>

    <div className={styles.rowGroup}>
      <div className={styles.line}>Agreement Type</div>
      <div className={styles.line}>
        <div className={styles.dropDown}>
          <Dropdown
            handlerOnClick={toggleDropDown}
            handleOnSelectedItemChange={onDropdownItemChange}
            selectedOption={'Select'}
            options={['Group']}
            activateMouseLeaveEvent/>
        </div>
      </div>
    </div>
    <div className={styles.rowGroup}>
      <div className={styles.line}>Active Date</div>
      <div className={styles.line}>{formatDate(new Date())}</div>
    </div>

  </div>

)

export default TradingEntities