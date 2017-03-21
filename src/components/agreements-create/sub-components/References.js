import React from 'react'
import Dropdown  from '../../Dropdown/Dropdown'
import ToggleSwitch from '../../common/ToggleSwitch'
import {
  ReferencesCallDriver,
  ReferencesCallIssuance,
  ReferencesMarginTerms
} from './references-sections'
import styles from './ContentBody.css'


export default class Identifiers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCallDriverExpanded: false
    }
  }

  toggleDropDown(e) {
  }

  onDropdownItemChange(e) {
  }

  render() {
    const {
      propIsCsa,
      propIsRegulatory,
      propToggleCsa,
      propToggleRegulatory,
      propIsDisplay
    } = this.props

    return (
      <div className={propIsDisplay ? styles.createContentFlexTwo : styles.hideForm}>
        <div className={styles.rowGroup}>
          <div className={styles.line}>Master Agreement Name</div>
          <div className={styles.line}>
            <div className={styles.dropDown}>
              <Dropdown
                handlerOnClick={this.toggleDropDown}
                handleOnSelectedItemChange={this.onDropdownItemChange}
                selectedOption={'Select'}
                options={['Select', 'WIP']}
                activateMouseLeaveEvent/>
            </div>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>ISDA Group Agreement Name</div>
          <div className={styles.line}>
            <input type="text" className={styles.inputTextBox}/>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>Unique Identifier</div>
          <div className={styles.line}>
            <div className={styles.dropDown}>
              <Dropdown
                handlerOnClick={this.toggleDropDown}
                handleOnSelectedItemChange={this.onDropdownItemChange}
                selectedOption={'Select'}
                options={['Select', 'WIP']}
                activateMouseLeaveEvent/>
            </div>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line + ' ' + styles.flexLine}>
            <ToggleSwitch propIsOn={propIsCsa}
                          propOnToggle={() => propToggleCsa()}/>
            &nbsp;CSA References
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line + ' ' + styles.flexLine}>
            <ToggleSwitch propIsOn={propIsRegulatory}
                          propOnToggle={() => propToggleRegulatory()}/>
            &nbsp;Regulatory References
          </div>
        </div>

        {
          !propIsCsa && !propIsRegulatory &&
          <ReferencesCallDriver/>
        }

        {
          !propIsCsa && !propIsRegulatory &&
          <ReferencesMarginTerms/>
        }

        {
          !propIsCsa && !propIsRegulatory &&
          <ReferencesCallIssuance/>
        }

      </div>
    )
  }
}