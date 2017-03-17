import React from 'react'
import Dropdown from '../../Dropdown/Dropdown'
import ToggleSwitch from '../../common/ToggleSwitch'
import styles from './ContentBody.css'


export default class ReferencesCallDriver extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isCallDriverExpanded: false,
      isStpAutoPledge: false,
      isStpTypeCurrency: false,
      isStpAutoPledgeAccept: false
    }

    this.onDropdownPledgeStpType = this.onDropdownPledgeStpType.bind(this)
  }

  toggleDropDown(e) {
  }

  onDropdownItemChange(e) {
  }

  onDropdownPledgeStpType(e) {
    this.setState({isStpTypeCurrency: (e.target.textContent == 'CURRENCY')})
  }

  render() {
    const {
      propIsMenuCsa
    } = this.props

    return (
      <div>
        <div className={styles.rowGroup}>
          <div className={styles.line}>
            <span className={styles.agreementsSectionHeader}>
              Call Driver Details{propIsMenuCsa && ' - CSA'}
              </span>
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

              {propIsMenuCsa && <div className={styles.rowGroup}>
                <div className={styles.line}>Exposure Treatment</div>
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
              </div>}


              <div className={styles.rowGroup}>
                <div className={styles.line}>Account Base Currency</div>
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

              {!propIsMenuCsa && <div className={styles.rowGroup}>
                <div className={styles.line}>Eligible Currency</div>
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
              </div>}

            </div>
            <div className={styles.agreementsSectionRight}>
              Local Details
              <hr/>

              <div className={styles.rowGroup}>
                <div className={styles.line + ' ' + styles.flexLine}>
                  <ToggleSwitch propIsOn={this.state.isStpAutoPledge}
                                propOnToggle={() => this.setState({isStpAutoPledge: !this.state.isStpAutoPledge})}/>
                  &nbsp;STP Auto Pledge
                </div>
              </div>

              <div className={styles.rowGroup}>
                <div className={styles.line}>Pledge STP Call Type</div>
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
                <div className={styles.line}>Pledge STP Type</div>
                <div className={styles.line}>
                  <div className={styles.dropDown}>
                    <Dropdown
                      handlerOnClick={this.toggleDropDown}
                      handleOnSelectedItemChange={this.onDropdownPledgeStpType}
                      selectedOption={'Select'}
                      options={['Currency', 'Tri-Party']}
                      activateMouseLeaveEvent/>
                  </div>
                </div>
              </div>

              {this.state.isStpTypeCurrency && <div className={styles.rowGroup}>
                <div className={styles.line}>Pledge STP Currency</div>
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
              </div>}

              <div className={styles.rowGroup}>
                <div className={styles.line + ' ' + styles.flexLine}>
                  <ToggleSwitch propIsOn={this.state.isStpAutoPledgeAccept}
                                propOnToggle={() =>
                                  this.setState({
                                    isStpAutoPledgeAccept: !this.state.isStpAutoPledgeAccept
                                  })}/>
                  &nbsp;STP Auto Pledge Accept
                </div>
              </div>

              <div className={styles.rowGroup}>
                <div className={styles.line}>Pledge Accept STP Call Type</div>
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
                <div className={styles.line}>Pledge Accept STP Type</div>
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
                <div className={styles.line}>Pledge Accept STP Currency</div>
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


            </div>
          </div>
        }
      </div>

    )
  }
}