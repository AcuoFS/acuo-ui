import React from 'react'
import Dropdown from '../../Dropdown/Dropdown'
import styles from './ContentBody.css'


const OtherDetails = (props) => {
  const toggleDropDown = (e) => {
  }

  const onDropdownItemChange = (e) => {
  }

  return (
    <div className={styles.createContent}>
      <div className={styles.rowGroup}>
        <div className={styles.line}>Reference Identifier</div>
        <div className={styles.line}>
          <input type="text" className={styles.inputTextBox}/>
        </div>
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line}>Agreement Email List</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={toggleDropDown}
              handleOnSelectedItemChange={onDropdownItemChange}
              selectedOption={'Select'}
              options={['WIP']}
              activateMouseLeaveEvent/>
          </div>
        </div>
      </div>

      <div className={styles.rowGroup}>
        <div className={styles.line}>Time Zone</div>
        <div className={styles.line}>
          <div className={styles.dropDown}>
            <Dropdown
              handlerOnClick={toggleDropDown}
              handleOnSelectedItemChange={onDropdownItemChange}
              selectedOption={'GMT'}
              options={['WIP']}
              activateMouseLeaveEvent/>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>Threshold</div>
          <div className={styles.line}>
            <div className={styles.dropDown}>
              <Dropdown
                handlerOnClick={toggleDropDown}
                handleOnSelectedItemChange={onDropdownItemChange}
                selectedOption={''}
                options={['WIP']}
                activateMouseLeaveEvent/>
            </div>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>Product Codes</div>
          <div className={styles.line}>
            <div className={styles.dropDown}>
              <Dropdown
                handlerOnClick={toggleDropDown}
                handleOnSelectedItemChange={onDropdownItemChange}
                selectedOption={'Select'}
                options={['WIP']}
                activateMouseLeaveEvent/>
            </div>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>
            <input type="radio" name="soleCalc" value="Off" defaultChecked/>Off
            <input type="radio" name="soleCalc" value="On"/>On
            Sole Calculation
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>Valuation Agent</div>
          <div className={styles.line}>
            <div className={styles.dropDown}>
              <Dropdown
                handlerOnClick={toggleDropDown}
                handleOnSelectedItemChange={onDropdownItemChange}
                selectedOption={'Select'}
                options={['WIP']}
                activateMouseLeaveEvent/>
            </div>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>Regulatory Jurisdiction</div>
          <div className={styles.line}>
            <input type="text" className={styles.inputTextBox}/>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>Other Regulatory Jurisdiction</div>
          <div className={styles.line}>
            <input type="text" className={styles.inputTextBox}/>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>button</div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>box</div>
        </div>

      </div>


    </div>
  )
}

export default OtherDetails