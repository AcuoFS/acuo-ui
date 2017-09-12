import React from 'react'
import Dropdown from '../../../Dropdown/Dropdown'
import TImeSelector from '../../../common/TimeSelector/TImeSelector'
import {gmtTimezoneList} from '../../../../utils'
import MultipleSelection from '../../../MultipleSelection/MultipleSelection'
import styles from '../ContentBody.css'
import Select from 'react-select'// react-select using styles from src/static/react-select/react-select.css
import countryList from './../../../../constants/Countries'


export default class ReferencesMarginTerms extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSectionExpanded: false,
      notiHour: '',
      notiMin: '',
      exposureCalculationCurrency: []
    }

  }

  exposureCalculationCurrencyChange(val) {
    this.setState({
      exposureCalculationCurrency: val
    })
  }

  toggleDropDown(e) {
  }

  onDropdownItemChange(e) {
  }

  render() {
    const {
      propIsSubMenu,
      propPostfixLabel
    } = this.props

    return (
      <div>
        <div className={styles.rowGroup}>
          <div className={styles.line}>
            <span className={styles.agreementsSectionHeader}>
              Margin Terms
              {propPostfixLabel}
              </span>
            <span className={this.state.isSectionExpanded
              ? styles.upArrow : styles.downArrow}
                  onClick={() => this.setState({
                    isSectionExpanded: !this.state.isSectionExpanded
                  })}/>
          </div>
        </div>

        {this.state.isSectionExpanded &&
        <div className={styles.flexCont}>
          <div className={styles.agreementsSectionLeft}>
            Shared Details
            <hr/>

            <div className={styles.rowGroup}>
              <div className={styles.line}>Exposure Calculation Currency</div>
              <div className={styles.line}>
                <div className={styles.dropDown}>
                  <Select
                    value={this.state.exposureCalculationCurrency}
                    options={countryList.get()}
                    onChange={this.exposureCalculationCurrencyChange}
                    multi={true}/>
                </div>
              </div>
            </div>


            <div className={styles.rowGroup}>
              <div className={styles.line}>Notification Time</div>
              <div className={styles.line}>
                <TImeSelector
                  updateHour={(h) => this.setState({notiHour: h})}
                  updateMin={(m) => this.setState({notiMin: m})}/>
              </div>
            </div>

            <div className={styles.rowGroup}>
              <div className={styles.line}>Notification Time Zone</div>
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
            </div>

            <div className={styles.rowGroup}>
              <div className={styles.line}>Threshold Amount</div>
              <div className={styles.line}>
                <input type="number" className={styles.inputTextBox}/>
              </div>
            </div>

            <div className={styles.rowGroup}>
              <div className={styles.line}>Threshold Treatment</div>
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
              <div className={styles.line}>
                <div className={styles.minTransferAmtLine}>
                  <div className={styles.flexOne}></div>
                  <div className={styles.flexOne + ' ' + styles.minTransferHeader}>Deliver</div>
                  <div className={styles.flexOne + ' ' + styles.minTransferHeader}>Return</div>
                </div>
                <div className={styles.minTransferAmtLine}>
                  <div className={styles.flexOne + ' ' + styles.minTransferLabel}>Minimum Transfer Amount</div>
                  <div className={styles.flexOne}><input type="number" className={styles.smallTextBox}/></div>
                  <div className={styles.flexOne}><input type="number" className={styles.smallTextBox}/></div>
                </div>

                <div className={styles.minTransferAmtLine}>
                  <div className={styles.flexOne + ' ' + styles.minTransferLabel}>Rounding Amount</div>
                  <div className={styles.flexOne}><input type="number" className={styles.smallTextBox}/></div>
                  <div className={styles.flexOne}><input type="number" className={styles.smallTextBox}/></div>
                </div>

                <div className={styles.minTransferAmtLine}>
                  <div className={styles.flexOne + ' ' + styles.minTransferLabel}>Rounding Method</div>
                  <div className={styles.flexOne}>
                    <div className={styles.smallDropdown}>
                      <Dropdown
                        handlerOnClick={this.toggleDropDown}
                        handleOnSelectedItemChange={this.onDropdownItemChange}
                        selectedOption={''}
                        options={['', 'Up', 'Down']}
                        activateMouseLeaveEvent/>
                    </div>
                  </div>
                  <div className={styles.flexOne}>
                    <div className={styles.smallDropdown}>
                      <Dropdown
                        handlerOnClick={this.toggleDropDown}
                        handleOnSelectedItemChange={this.onDropdownItemChange}
                        selectedOption={''}
                        options={['', 'Up', 'Down']}
                        activateMouseLeaveEvent/>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className={styles.agreementsSectionRight}>
            Local Details
            <hr/>

            <div className={styles.rowGroup}>
              <div className={styles.line}>Calculation Type</div>
              <div className={styles.line}>
                <div className={styles.dropDown}>
                  <Dropdown
                    handlerOnClick={this.toggleDropDown}
                    handleOnSelectedItemChange={this.onDropdownItemChange}
                    selectedOption={'Select'}
                    options={['Select', 'Delta', 'Net Exposure']}
                    activateMouseLeaveEvent/>
                </div>
              </div>
            </div>

            <div className={styles.rowGroup}>
              <div className={styles.line}>Calculation Source</div>
              <div className={styles.line}>
                <div className={styles.dropDown}>
                  <Dropdown
                    handlerOnClick={this.toggleDropDown}
                    handleOnSelectedItemChange={this.onDropdownItemChange}
                    selectedOption={'Select'}
                    options={['Select', 'Local', 'Central']}
                    activateMouseLeaveEvent/>
                </div>
              </div>
            </div>


          </div>

          <div className={propIsSubMenu &&
          styles.agreementsSectionRight}/>

        </div>}

      </div>
    )
  }
}