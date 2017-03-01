import React from 'react'
import Dropdown from '../../Dropdown/Dropdown'
import {gmtTimezoneList} from '../../../utils'
import SelectionBox from '../../common/SelectionBox'
import styles from './ContentBody.css'


export default class OtherDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      otherJurisdictionList: ['Click', 'To', 'Remove', 'Me'],
      otherJurisdictionInput: ''
    }
    this.onRemoveOtherJurisdiction = this.onRemoveOtherJurisdiction.bind(this)
  }

  toggleDropDown(e) {
  }

  onDropdownItemChange(e) {
  }

  onRemoveOtherJurisdiction(jur) {
    // selectedRows: this.state.selectedRows.filter(row =>
    // row.mgnCallUploadId != rowObj.mgnCallUploadId)

    this.setState({
      otherJurisdictionList: this.state.otherJurisdictionList.filter(item => item != jur)
    })
  }


  render() {
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
                handlerOnClick={this.toggleDropDown}
                handleOnSelectedItemChange={this.onDropdownItemChange}
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
                handlerOnClick={this.toggleDropDown}
                handleOnSelectedItemChange={this.onDropdownItemChange}
                selectedOption={'GMT'}
                options={gmtTimezoneList}
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
                  handlerOnClick={this.toggleDropDown}
                  handleOnSelectedItemChange={this.onDropdownItemChange}
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
                  handlerOnClick={this.toggleDropDown}
                  handleOnSelectedItemChange={this.onDropdownItemChange}
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
              <input type="text" className={styles.inputTextBox} value={this.state.otherJurisdictionInput}
                     onChange={(e) => this.setState({otherJurisdictionInput: e.target.value})}/>
            </div>
          </div>

          <div className={styles.rowGroup}>
            <div className={styles.line}>
              <button className={styles.btnStyleActive}
                      onClick={() => this.setState({
                        otherJurisdictionList: [...this.state.otherJurisdictionList,
                          this.state.otherJurisdictionInput],
                        otherJurisdictionInput: ''
                      })}>Add
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