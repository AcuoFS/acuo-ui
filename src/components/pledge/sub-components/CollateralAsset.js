import React, {PropTypes} from 'react'
import styles from '../Pledge.css'

class CollateralAsset extends React.Component {
  constructor(props) {
    super(props)
    this.amendCollateral = this.amendCollateral.bind(this)
    this.allocateCollateral = this.allocateCollateral.bind(this)
    this.state = {
      toggle: ""

    }
  }


  amendCollateral(e) {
    console.log('e is', e.currentTarget.dataset.ref)
    this.setState({
      toggle: e.currentTarget.dataset.ref
    })
  }

  allocateCollateral(e) {
    console.log('data ref for allocateCollateral', e.currentTarget.dataset.ref)
    this.setState({
      allocateCollateral: e.currentTarget.dataset.ref
    })
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
      propAssetIdType
    } = this.props
    if (propIsDisplayAll) {
      return (
        <div className={styles.collateralRow}>
          <div className={styles.collateralCell}>{propAsset}</div>
          <div className={styles.collateralCell}>{propPrice}</div>
          <div className={styles.collateralCell}>{propCcy}</div>
          <div className={styles.collateralCell}>{propDeliveryTime}</div>
          {/*<div className={styles.collateralCell}>{propStatus}</div>*/}

          <div className={styles.relative} onClick={this.amendCollateral}
               data-ref={propCollateralType + propAssetId + propAssetIdType}>
            {propStatus}
            {console.log("composite key value is", this.state.toggle)}
            <div
              className={styles.boxed + ' ' + (this.state.toggle == propCollateralType + propAssetId + propAssetIdType ? styles.showBox : '')}>
              <div>Available</div>
              <div>Remove</div>
              <div>Amend amount</div>
              <div className={styles.relative} onClick={this.allocateCollateral}
                   data-ref={"allocate" + propCollateralType + propAssetId + propAssetIdType}>Allocate to Call
                {console.log("composite key for allocate value is", this.state.allocateCollateral)}
                <div
                  className={styles.boxAllocate + ' ' + (this.state.allocateCollateral == "allocate" + propCollateralType + propAssetId + propAssetIdType ? styles.showBox : '')}>
                  <div className={styles.popupAllocateRoot}>

                    <div className={styles.popupRow}> {/* one row div*/}
                      <div className={styles.popupText}> Margin Agreement
                      </div>
                      <input type="text" className={styles.popupInputBox}/>
                    </div>


                    <div className={styles.popupRow}> {/* one row div*/}
                      <div className={styles.popupText}> Amount
                      </div>
                      <input type="text" className={styles.popupInputBox}/>
                    </div>

                    <div className={styles.buttonContainer}>
                      <button type="submit">Allocate</button>
                      <button type="submit">Cancel</button>
                    </div>

                  </div>
                </div>
              </div> 
            </div>
          </div>

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
    } else {
      return (
        <div className={styles.collateralRow}>
          <div className={styles.collateralCell}>{propAsset}</div>
          <div className={styles.collateralCell}>{propPrice}</div>
          <div className={styles.collateralCell}>{propCcy}</div>
          <div className={styles.collateralCell}>{propDeliveryTime}</div>
          <div className={styles.collateralCell}>{propStatus}</div>
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