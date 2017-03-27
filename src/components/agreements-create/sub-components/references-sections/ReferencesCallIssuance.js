import React from 'react'
import ToggleSwitch from '../../../common/ToggleSwitch'
import Dropdown from '../../../Dropdown/Dropdown'
import styles from '../ContentBody.css'


export default class ReferencesCallIssuance extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCallIssuanceExpanded: false,
      isManual: false,
      isNoMaterial: false
    }

  }

  toggleDropDown(e) {
  }

  onDropdownItemChange(e) {
  }

  render() {
    const {
      propIsMenuCsa,
      propIsMenuRegulatory
    } = this.props

    return (
      <div>
        <div className={styles.rowGroup}>
          <div className={styles.line}>
            <span className={styles.agreementsSectionHeader}>
              Call Issuance Settings
              {propIsMenuCsa && ' - CSA'}
              {propIsMenuRegulatory && ' - Regulatory CSA'}
              </span>
            <span className={this.state.isCallIssuanceExpanded
              ? styles.upArrow : styles.downArrow}
                  onClick={() => this.setState({
                    isCallIssuanceExpanded: !this.state.isCallIssuanceExpanded
                  })}/>
          </div>
        </div>

        {this.state.isCallIssuanceExpanded &&
        <div className={styles.agreementsSectionContainer}>
          <div className={styles.agreementsSectionLeft}>
            Local Details
            <hr/>

            <div className={styles.rowGroup}>
              <div className={styles.line + ' ' + styles.flexLine}>
                <ToggleSwitch propIsOn={this.state.isManual}
                              propOnToggle={() =>
                                this.setState({
                                  isManual: !this.state.isManual
                                })}/>
                &nbsp;Manual
              </div>
            </div>

            <div className={styles.rowGroup}>
              <div className={styles.line}>Schedule</div>
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
              <div className={styles.line}>Own vs Cpty Tolerance</div>
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
                <ToggleSwitch propIsOn={this.state.isNoMaterial}
                              propOnToggle={() =>
                                this.setState({
                                  isNoMaterial: !this.state.isNoMaterial
                                })}/>
                &nbsp;No Material Change Check
              </div>
            </div>

          </div>
          <div className={(propIsMenuCsa || propIsMenuRegulatory) ?
            styles.agreementsSectionRightFlexTwo : styles.agreementsSectionRight}/>
        </div>}

      </div>
    )
  }
}