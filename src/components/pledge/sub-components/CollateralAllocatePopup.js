import React from 'react'
import Dropdown from '../../Dropdown/Dropdown'
import styles from '../Pledge.css'


export default class CollateralAllocatePopup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      toggle: "",
      isAssetValidToAllocate: false,
      isAssetValidToAmend: false,
      isMgnAgreementDropDownSelected: false,
      isCallTypeDropDownSelected: false,
      selectedTab: 'allocate',
      allocateAmount: 0.00,
      amendAmount: 0.00
    }

    this.amountInput = null
    this.amendAmount = null

    this.amendCollateral = this.amendCollateral.bind(this)
    this.allocateCollateral = this.allocateCollateral.bind(this)
    // this.cancelCollateral = this.cancelCollateral.bind(this)
    // this.onRemoveFromEarmarked = this.onRemoveFromEarmarked.bind(this)
    this.removeCollateralBox = this.removeCollateralBox.bind(this)
    this.validateAllocateForm = this.validateAllocateForm.bind(this)
    this.validateAmendForm = this.validateAmendForm.bind(this)
    this.onAgreementDropdownItemChange = this.onAgreementDropdownItemChange.bind(this)
    this.onCallTypeDropdownItemChange = this.onCallTypeDropdownItemChange.bind(this)
    this.selectTab = this.selectTab.bind(this)
    this.checkSelection = this.checkSelection.bind(this)
    this.checkContent = this.checkContent.bind(this)
    this.changeAllocateAmount = this.changeAllocateAmount.bind(this)
    this.changeAmendAmount = this.changeAmendAmount.bind(this)
  }

  changeAmendAmount(e) {
    this.setState({
      amendAmount: e.target.value
    }, this.validateAmendForm)
  }

  allocateCollateral(e) {
    this.setState({
      allocateCollateral: e.currentTarget.dataset.ref
    })
  }

  amendCollateral(e) {
    this.setState({
      toggle: e.currentTarget.dataset.ref
    })
  }

  checkSelection(selection) {
    return (selection == this.state.selectedTab ? styles.selectedTab : '')
  }

  selectTab(e) {
    this.setState({
      selectedTab: e.currentTarget.dataset.ref
    })
  }

  removeCollateralBox(e) {
    this.setState({
      toggle: "",
      allocateCollateral: ""
    })

    e.stopPropagation()
  }

  checkContent(selection) {
    return (selection == this.state.selectedTab ? styles.showContent : '')
  }

  onAgreementDropdownItemChange(e) {
    this.setState({
      isMgnAgreementDropDownSelected: true
    }, this.validateAllocateForm)

    e.stopPropagation();
  }

  toggleDropDown(e) {
  }

  onCallTypeDropdownItemChange(e) {
    this.setState({
      isCallTypeDropDownSelected: true
    }, this.validateAllocateForm)

    e.stopPropagation();
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

  checkAmountExceeding(total, amount) {
    if (amount > total)
      return (
        <div className={styles.errorPopUp}>
          Amount entered is larger than available.
        </div>
      )
  }

  validateAmendForm() {
    const isAllInputFilled =
      !(this.amendAmount.value == "0" || this.amendAmount.value.trim() == "")

    this.setState({
      isAssetValidToAmend: isAllInputFilled
    })
  }

  render(){
    const {propCollateralType, propAssetId, propAssetIdType, statusClass,
      propStatus, propIsDisplayAll, listOfMarginCallName, rawPrice} = this.props

    return (
      <div className={styles.relative} onClick={this.amendCollateral}
           data-ref={propCollateralType + propAssetId + propAssetIdType}>
        <span className={statusClass}>{propStatus}</span>
        <div
          className={(propIsDisplayAll ? styles.boxed : styles.leftBoxed ) + ' ' +
          ((this.state.toggle == propCollateralType + propAssetId + propAssetIdType) ? styles.showBox : '')}>
          <div className={styles.tabHolder}>
            <div
              className={styles.tab + ' ' + this.checkSelection('allocate')}
              data-ref="allocate"
              onClick={this.selectTab}>
              Allocate to Call
            </div>
            <div
              className={styles.tab + ' ' + this.checkSelection('amend')}
              data-ref="amend"
              onClick={this.selectTab}>
              Amend
            </div>
            <div
              className={styles.tab + ' ' + this.checkSelection('remove')}
              data-ref="remove"
              onClick={this.selectTab}>
              Remove
            </div>

            <div className={styles.closeButton} onClick={this.removeCollateralBox}>
              x
            </div>
          </div>

          <div className="content">
            <div className={styles.tabbedContent + ' ' + this.checkContent('allocate')}>
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
                {/*<input type="text" className={styles.popupInputBox}/>*/}
              </div>

              <div className={styles.popupRow}> {/* one row div*/}
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

              <div className={styles.popupRow}> {/* one row div*/}
                <div className={styles.popupText}>
                </div>
                <div className={styles.popupInputBox}>
                  <div className={styles.helperText}>Amount rounded down to nearest unit value</div>
                  {this.checkAmountExceeding(rawPrice, this.state.allocateAmount)}
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

            <div className={styles.tabbedContent + ' ' + this.checkContent('amend')}>
              <div className={styles.popupRow}> {/* one row div*/}
                <div className={styles.popupText}> Amount
                </div>
                <div className={styles.popupInputBox}>
                  <input type="number" className={styles.popupInputBox}
                         ref={dom => this.amendAmount = dom} value={this.state.amendAmount}
                         onChange={(e) => {this.changeAmendAmount(e)}}/>
                </div>
              </div>

              <div className={styles.popupRow}> {/* one row div*/}
                <div className={styles.popupText}>
                </div>
                <div className={styles.popupInputBox}>
                  <div className={styles.helperText}>Amount rounded down to nearest unit value</div>
                  {this.checkAmountExceeding(rawPrice, this.state.amendAmount)}
                </div>
              </div>

              <div className={styles.buttonContainer}>
                <button type="submit" disabled={!this.state.isAssetValidToAmend}
                        className={this.state.isAssetValidToAmend ?
                          styles.btnEnabled : styles.btnDisabled}>
                  Earmark
                </button>
              </div>
            </div>
            <div className={styles.tabbedContent + ' ' + this.checkContent('remove')}>
              <div className={styles.removeAsset}>
                Unearmark Asset
              </div>
              <div className={styles.buttonContainer + ' ' + styles.removeAsset}>
                <button type="submit" className={styles.btnEnabled}>
                  Remove
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>

    )
  }

}