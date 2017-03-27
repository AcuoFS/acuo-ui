import React from 'react'
import Dropdown from '../../Dropdown/Dropdown'
import {gmtTimezoneList} from '../../../utils'
import SelectionBox from '../../common/SelectionBox'
import ToggleSwitch from '../../common/ToggleSwitch'
import styles from './ContentBody.css'


export default class OtherDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      otherJurisdictionList: ['Click', 'To', 'Remove', 'Me'],
      otherJurisdictionInput: '',
      isSoleCalc: false
    }
    this.onRemoveOtherJurisdiction = this.onRemoveOtherJurisdiction.bind(this)
    this.onToggleSoleCalc = this.onToggleSoleCalc.bind(this)
  }

  toggleDropDown(e) {
  }

  onDropdownItemChange(e) {
  }

  onRemoveOtherJurisdiction(jur) {
    this.setState({
      otherJurisdictionList: this.state.otherJurisdictionList.filter(item => item != jur)
    })
  }

  onToggleSoleCalc() {
    this.setState({
      isSoleCalc: !this.state.isSoleCalc
    })
  }

  isEmptyString(str) {
    return str.trim() == ''
  }

  render() {
    const {propIsDisplay} = this.props

    return (
      <div className={propIsDisplay ? styles.createContent : styles.hideForm}>
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
                handlerOnClick={this.toggleDropDown}
                handleOnSelectedItemChange={this.onDropdownItemChange}
                selectedOption={'Select'}
                options={['Select', 'WIP']}
                activateMouseLeaveEvent/>
            </div>
          </div>
        </div>

        <div className={styles.rowGroup}>
          <div className={styles.line}>Time Zone</div>
          <div className={styles.line}>
            <div className={styles.dropDown}>
              <Dropdown
                handlerOnClick={this.toggleDropDown}
                handleOnSelectedItemChange={this.onDropdownItemChange}
                selectedOption={'GMT'}
                options={['GMT', ...gmtTimezoneList]}
                isFixedOptionsHeight
                activateMouseLeaveEvent/>
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.line}>Threshold</div>
            <div className={styles.line}>
              <div className={styles.dropDown}>
                <Dropdown
                  handlerOnClick={this.toggleDropDown}
                  handleOnSelectedItemChange={this.onDropdownItemChange}
                  selectedOption={''}
                  options={['Select', 'WIP']}
                  activateMouseLeaveEvent/>
              </div>
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.line + ' ' + styles.flexLine}>
              <ToggleSwitch propIsOn={this.state.isSoleCalc}
                            propOnToggle={this.onToggleSoleCalc}/> &nbsp;Sole Calculation
            </div>
          </div>

          {this.state.isSoleCalc &&
          <div className={styles.rowGroup}>
            <div className={styles.line}>Valuation Agent</div>
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
          }

          <div className={styles.rowGroup}>
            <div className={styles.line}>Regulatory Jurisdiction</div>
            <div className={styles.line}>
              <input type="text" className={styles.inputTextBox}/>
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.line}>Other Regulatory Jurisdiction</div>
            <div className={styles.line}>
              <input type="text" className={styles.inputTextBox} value={this.state.otherJurisdictionInput}
                     onChange={(e) => this.setState({otherJurisdictionInput: e.target.value})}/>
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.line}>
              <button className={this.isEmptyString(this.state.otherJurisdictionInput)
                ? styles.btnStyleInactive
                : styles.btnStyleActive}
                      onClick={() => this.setState({
                        otherJurisdictionList: [...this.state.otherJurisdictionList,
                          this.state.otherJurisdictionInput],
                        otherJurisdictionInput: ''
                      })}
                      disabled={this.isEmptyString(this.state.otherJurisdictionInput)}>Add
              </button>
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.line}>
              <SelectionBox propListOfItems={this.state.otherJurisdictionList}
                            propOnRemoveItem={this.onRemoveOtherJurisdiction}/>
            </div>
          </div>

        </div>


      </div>
    )

  }
}