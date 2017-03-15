import React from 'react'
import Dropdown  from '../../Dropdown/Dropdown'
import ToggleSwitch from '../../common/ToggleSwitch'
import styles from './ContentBody.css'


export default class Identifiers extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCallDriverExpanded: false,
      isCsa: false,
      isRegulatory: false
    }
  }

  toggleDropDown(e) {
  }

  onDropdownItemChange(e) {
  }

  render() {
    return (
      <div className={styles.createContentFlexTwo}>
        <div className={styles.rowGroup}>
          <div className={styles.line}>Master Agreement Name</div>
          <div className={styles.line}>
            <div className={styles.dropDown}>
              <Dropdown
                handlerOnClick={this.toggleDropDown}
                handleOnSelectedItemChange={this.onDropdownItemChange}
                selectedOption={'Select'}
                options={['WIP']}
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
                options={['WIP']}
                activateMouseLeaveEvent/>
            </div>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line + ' ' + styles.flexLine}>
            <ToggleSwitch propIsOn={this.state.isCsa}
                          propOnToggle={() => this.setState({isCsa: !this.state.isCsa})}/>
            &nbsp;CSA References
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line + ' ' + styles.flexLine}>
            <ToggleSwitch propIsOn={this.state.isRegulatory}
                          propOnToggle={() => this.setState({isRegulatory: !this.state.isRegulatory})}/>
            &nbsp;Regulatory References
          </div>
        </div>

        <div>
          <div className={styles.rowGroup}>
            <div className={styles.line}>
              <span className={styles.agreementsSectionHeader}>Call Driver Details</span>
              <span className={this.state.isCallDriverExpanded
                ? styles.upArrow : styles.downArrow}
                    onClick={() => this.setState({
                      isCallDriverExpanded: !this.state.isCallDriverExpanded
                    })}/>
            </div>
          </div>

          {
            this.state.isCallDriverExpanded &&
            <div className={styles.agreementsSectionContainer}>
              <div className={styles.agreementsSectionLeft}>
                Shared Details
                <hr/>
              </div>
              <div className={styles.agreementsSectionRight}>
                Local Details
                <hr/>
              </div>
            </div>
          }
        </div>

      </div>
    )
  }
}