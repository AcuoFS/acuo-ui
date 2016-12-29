import React, {PropTypes} from 'react'
import styles from '../Pledge.css'
import Dropdown from '../../Dropdown/Dropdown'

class CollateralAsset extends React.Component {
  constructor(props) {
    super(props)
    this.amendCollateral = this.amendCollateral.bind(this)
    this.allocateCollateral = this.allocateCollateral.bind(this)
    this.cancelCollateral = this.cancelCollateral.bind(this)
    this.onRemoveFromEarmarked = this.onRemoveFromEarmarked.bind(this)
    this.removeCollateralBox = this.removeCollateralBox.bind(this)
    this.validateAllocateForm = this.validateAllocateForm.bind(this)
    this.onAgreementDropdownItemChange = this.onAgreementDropdownItemChange.bind(this)
    this.onCallTypeDropdownItemChange = this.onCallTypeDropdownItemChange.bind(this)

    this.state = {
      toggle: ""
      , isAssetValidToAllocate: false
      , isMgnAgreementDropDownSelected: false
      , isCallTypeDropDownSelected: false
    }


    this.amountInput = null
  }

  toggleDropDown(e) {
  }

  amendCollateral(e) {
    this.setState({
      toggle: e.currentTarget.dataset.ref
    })
  }

  onRemoveFromEarmarked(e, assetType, propAssetId, propAssetIdType, propHandleOnRemoveFromEarmarked) {

    propHandleOnRemoveFromEarmarked(e, assetType, propAssetId, propAssetIdType)
  }

  allocateCollateral(e) {
    this.setState({
      allocateCollateral: e.currentTarget.dataset.ref
    })
  }

  removeCollateralBox(e) {
    this.setState({
      toggle: "",
      allocateCollateral: ""
    })
  }

  cancelCollateral(e) {
    this.setState({
      allocateCollateral: ""
    })
  }

  getStatusColor(status) {

    let statusClass
    switch (status) {
      case 'AR':
        statusClass = styles.statusAR;
        break;
      case 'AV':
        statusClass = styles.statusAV;
        break;
      case 'DP':
        statusClass = styles.statusDP;
        break;
      case 'D':
        statusClass = styles.statusD;
        break;
    }
    return statusClass
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

  onAgreementDropdownItemChange(e) {
    this.setState({
      isMgnAgreementDropDownSelected: true
    }, this.validateAllocateForm)

    e.stopPropagation();
  }

  onCallTypeDropdownItemChange(e) {
    this.setState({
      isCallTypeDropDownSelected: true
    }, this.validateAllocateForm)

    e.stopPropagation();
  }

  render() {
    const {
      propAsset,
      propPrice,
      propCcy,
      propDeliveryTime,
      propStatus,
      propRating,
      propMaturityDate,
      propInternalCost,
      propExternalCost,
      propOppCost,
      propIsin,
      propVenue,
      propAcctId,
      propIsDisplayAll,
      propCollateralType,
      propAssetId,
      propAssetIdType,
      propHandleOnRemoveFromEarmarked,
      listOfMarginCallName
    } = this.props

    let statusClass = this.getStatusColor(propStatus)
    let statusDisplay = (
      <div className={styles.collateralCell}><span className={statusClass}>{propStatus}</span></div>
    )
    if (propCollateralType == 'Earmarked') {

      statusDisplay = (
        <div className={styles.relative} onClick={this.amendCollateral} onMouseLeave={this.removeCollateralBox}
             data-ref={propCollateralType + propAssetId + propAssetIdType}>
          <span className={statusClass}>{propStatus}</span>
          <div
            className={(propIsDisplayAll ? styles.boxed : styles.leftBoxed ) + ' ' + ((this.state.toggle == propCollateralType + propAssetId + propAssetIdType) ? styles.showBox : '')}>
            <div>Available</div>
            <div
              onClick={(e) => this.onRemoveFromEarmarked(e, 'earmarked', propAssetId, propAssetIdType, propHandleOnRemoveFromEarmarked)}>
              Remove
            </div>
            <div>Amend amount</div>
            <div className={styles.relative} onClick={this.allocateCollateral}
                 data-ref={"allocate" + propCollateralType + propAssetId + propAssetIdType}>Allocate to Call
            </div>
            <div
              className={(propIsDisplayAll ? styles.boxAllocate : styles.leftBoxAllocate) + ' ' + (this.state.allocateCollateral == "allocate" + propCollateralType + propAssetId +
              propAssetIdType ? styles.showBox : '')}>
              <div className={styles.popupAllocateRoot}>

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
                           ref={dom => this.amountInput = dom} onChange={this.validateAllocateForm}/>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button type="submit" disabled={!this.state.isAssetValidToAllocate}
                          className={this.state.isAssetValidToAllocate ?
                            styles.btnEnabled : styles.btnDisabled}>
                    Allocate
                  </button>
                  <button type="submit" onClick={this.cancelCollateral} className={styles.btnEnabled}>Cancel
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    }
    if (propIsDisplayAll) {
      return (
        <div className={styles.collateralRow}>
          <div className={styles.collateralCell}>{propAsset}</div>
          <div className={styles.collateralCell}>{propPrice}</div>
          <div className={styles.collateralCell}>{propCcy}</div>
          <div className={styles.collateralCell}>{propDeliveryTime}</div>
          {statusDisplay}
          <div className={styles.collateralCell}>{propRating}</div>
          <div className={styles.collateralCell}>{propMaturityDate}</div>
          <div className={styles.collateralCell}>{propInternalCost}</div>
          <div className={styles.collateralCell}>{propOppCost}</div>
          <div className={styles.collateralCell}>{propIsin}</div>
          <div className={styles.collateralCell}>{propVenue}</div>
          <div className={styles.collateralCell}>{propAcctId}</div>
        </div>
      )
    }
    else {
      return (
        <div className={styles.collateralRow}>
          <div className={styles.collateralCell}>{propAsset}</div>
          <div className={styles.collateralCell}>{propPrice}</div>
          <div className={styles.collateralCell}>{propCcy}</div>
          <div className={styles.collateralCell}>{propDeliveryTime}</div>
          {statusDisplay}
          <div className={styles.collateralCell}>{propRating}</div>
          <div className={styles.collateralCell}>{propMaturityDate}</div>
        </div>
      )
    }
  }
}


export default CollateralAsset

CollateralAsset.PropTypes = {
  propAsset: PropTypes.string,
  propPrice: PropTypes.string,
  propCcy: PropTypes.string,
  propDeliveryTime: PropTypes.string,
  propStatus: PropTypes.string,
  propRating: PropTypes.string,
  propMaturityDate: PropTypes.string,
  propInternalCost: PropTypes.string,
  propExternalCost: PropTypes.string,
  propOppCost: PropTypes.string,
  propIsin: PropTypes.string,
  propVenue: PropTypes.string,
  propAcctId: PropTypes.string,
  listOfMarginCallName: PropTypes.arrayOf(PropTypes.string).isRequired
}

CollateralAsset.defaultProps = {
  propAsset: "",
  propPrice: "",
  propCcy: "",
  propDeliveryTime: "",
  propStatus: "",
  propRating: "",
  propMaturityDate: "",
  propInternalCost: "",
  propExternalCost: "",
  propOppCost: "",
  propIsin: "",
  propVenue: "",
  propAcctId: ""
}