import React from 'react'
import Dropdown from '../../../../Dropdown/Dropdown'
import {POPUP_TAB_ALLOCATE} from'../../../../../constants/CollateralTypes'
import styles from '../../../Pledge.css'


export default class CollateralAllocate extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      toggle: "",
      isAssetValidToAllocate: false,
      isMgnAgreementDropDownSelected: false,
      isCallTypeDropDownSelected: false,
      allocateAmount: 0.00
    }

    // this.allocateCollateral = this.allocateCollateral.bind(this)
    this.validateAllocateForm = this.validateAllocateForm.bind(this)
    this.onAgreementDropdownItemChange = this.onAgreementDropdownItemChange.bind(this)
    this.onCallTypeDropdownItemChange = this.onCallTypeDropdownItemChange.bind(this)
    this.changeAllocateAmount = this.changeAllocateAmount.bind(this)

    this.amountInput = null
  }

  onAgreementDropdownItemChange(e) {
    this.setState({
      isMgnAgreementDropDownSelected: true
    }, this.validateAllocateForm)

    e.stopPropagation()
  }

  toggleDropDown(e) {
  }

  onCallTypeDropdownItemChange(e) {
    this.setState({
      isCallTypeDropDownSelected: true
    }, this.validateAllocateForm)

    e.stopPropagation()
  }

  validateAllocateForm() {
    const isAllInputFilled =
      !(this.amountInput.value.trim() == "") &&
      this.state.isMgnAgreementDropDownSelected &&
      this.state.isCallTypeDropDownSelected

    this.setState({
      isAssetValidToAllocate: isAllInputFilled
    })
  }

  changeAllocateAmount(e) {
    this.setState({
      allocateAmount: e.target.value
    })
  }

  render(){
    const {
      checkContent, checkAmountExceeding, listOfMarginCallName, rawPrice
    } = this.props

    return (
      <div className={styles.tabbedContent + ' ' + checkContent(POPUP_TAB_ALLOCATE)}>
        <div className={styles.popupRow}> {/* one row div*/}
          <div className={styles.popupText}> Margin Agreement
          </div>
          <div className={styles.popupInputBox}>
            <Dropdown
              handlerOnClick={this.toggleDropDown}
              handleOnSelectedItemChange={this.onAgreementDropdownItemChange}
              selectedOption='Select One'
              options={listOfMarginCallName}
              activateMouseLeaveEvent
            />
          </div>
        </div>
        <div className={styles.popupRow}> {/* one row div*/}
          <div className={styles.popupText}> Call Type
          </div>
          <div id="marginOption" className={styles.popupInputBox}>
            <Dropdown
              handlerOnClick={this.toggleDropDown}
              handleOnSelectedItemChange={this.onCallTypeDropdownItemChange}
              selectedOption='Select One'
              options={['Consolidated',
                'Credit',
                'Initial',
                'Netted',
                'Variation']}
              activateMouseLeaveEvent
            />
          </div>
        </div>

        <div className={styles.popupRow}>
          <div className={styles.popupText}> Amount
          </div>
          <div className={styles.popupInputBox}>
            <input type="number" className={styles.popupInputBox}
                   ref={dom => this.amountInput = dom} value={this.state.allocateAmount} onChange={(e) => {
              this.validateAllocateForm
              this.changeAllocateAmount(e)
            }}/>
          </div>
        </div>

        <div className={styles.popupRow}>
          <div className={styles.popupText}>
          </div>
          <div className={styles.popupInputBox}>
            <div className={styles.helperText}>Amount rounded down to nearest unit value</div>
            {checkAmountExceeding(rawPrice, this.state.allocateAmount)}
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" disabled={!this.state.isAssetValidToAllocate}
                  className={this.state.isAssetValidToAllocate ?
                    styles.btnEnabled : styles.btnDisabled}>
            Allocate
          </button>
        </div>
      </div>

    )
  }
}