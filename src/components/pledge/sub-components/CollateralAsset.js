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

    this.state = {
      toggle: ""
      // , cancelCollateral: false
    }
  }

  toggleDropDown(e) {
  }

  amendCollateral(e) {
    this.setState({
      toggle: e.currentTarget.dataset.ref
    })
  }

  onRemoveFromEarmarked(e, assetType, propAssetId, propAssetIdType,  propHandleOnRemoveFromEarmarked){

    propHandleOnRemoveFromEarmarked(e, assetType, propAssetId, propAssetIdType)
  }

  allocateCollateral(e) {
    this.setState({
      allocateCollateral: e.currentTarget.dataset.ref
    })
    console.log("allocate collateral called")
  }

  cancelCollateral(e) {
    this.setState({
      //cancelCollateral: e.currentTarget.dataset.ref
      allocateCollateral: ""
    })

    console.log("end of cancel: "+this.state.allocateCollateral)
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
      propHandleOnRemoveFromEarmarked
    } = this.props

    let statusClass = this.getStatusColor(propStatus)
    let statusDisplay = (
      <div className={styles.collateralCell}><span className={statusClass}>{propStatus}</span></div>
    )
    if(propCollateralType == 'Earmarked'){
      statusDisplay = (
        <div className={styles.relative} onClick={this.amendCollateral} onMouseLeave={this.removeCollateralBox}
             data-ref={propCollateralType + propAssetId + propAssetIdType}>
          <span className={statusClass}>{propStatus}</span>
          <div
            className={styles.boxed + ' ' + ((this.state.toggle == propCollateralType + propAssetId + propAssetIdType) ? styles.showBox : '')}>
            <div>Available</div>
            <div onClick={(e) => this.onRemoveFromEarmarked(e, 'earmarked', propAssetId, propAssetIdType,  propHandleOnRemoveFromEarmarked)}>Remove</div>
            <div>Amend amount</div>
            <div className={styles.relative} onClick={this.allocateCollateral}
                 data-ref={"allocate" + propCollateralType + propAssetId + propAssetIdType}>Allocate to Call
            </div>
            <div
              className={styles.boxAllocate + ' ' + (this.state.allocateCollateral == "allocate" + propCollateralType + propAssetId +
              propAssetIdType ? styles.showBox :'')}>
              <div className={styles.popupAllocateRoot}>

                <div className={styles.popupRow}> {/* one row div*/}
                  <div className={styles.popupText}> Margin Agreement
                  </div>
                  <div className={styles.popupInputBox}>
                    <Dropdown
                      handlerOnClick={this.toggleDropDown}
                      handleOnSelectedItemChange={e => e.stopPropagation()}
                      selectedOption='Select One'
                      options={['Acuo SG - ABC Securities FCM Global Fund',
                        'Acuo SG - ABC Securities FCM Global Fund',
                        'Acuo SG - ABC Securities FCM Global Fund 2',
                        'Acuo SG - ABC Securities FCM Global Fund 3',
                        'Acuo SG - ABC Securities FCM Global Fund 4',
                        'Acuo SG - ABC Securities FCM Global Fund 5',
                        'Acuo SG - ABC Securities FCM Global Fund 6',
                        'Acuo SG - ABC Securities FCM Global Fund 7']}
                    />
                  </div>
                  {/*<input type="text" className={styles.popupInputBox}/>*/}
                </div>


                <div className={styles.popupRow}> {/* one row div*/}
                  <div className={styles.popupText}> Amount
                  </div>
                  <div className={styles.popupInputBox}>
                    <input type="text" className={styles.popupInputBox}/>
                  </div>
                </div>

                <div className={styles.buttonContainer}>
                  <button type="submit">Allocate</button>
                  <button type="submit" onClick={this.cancelCollateral}>Cancel
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
          <div className={styles.collateralCell}>{propExternalCost}</div>
          <div className={styles.collateralCell}>{propOppCost}</div>
          <div className={styles.collateralCell}>{propIsin}</div>
          <div className={styles.collateralCell}>{propVenue}</div>
          <div className={styles.collateralCell}>{propAcctId}</div>
        </div>
      )
    }
    else{
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