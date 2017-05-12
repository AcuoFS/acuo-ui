import React, {PropTypes} from 'react'
import CollateralEarmarkStatusPopup from './popups/CollateralEarmarkStatusPopup'
import CollateralStatusPopup from './popups/CollateralStatusPopup'
import {COLLATERAL_EARMARKED} from '../../../constants/CollateralTypes'
import { maxLengthToEllipsis } from '../../../utils'
import styles from '../Pledge.css'


class CollateralAsset extends React.Component {
  onRemoveFromEarmarked(e, assetType, propAssetId, propAssetIdType, propHandleOnRemoveFromEarmarked) {
    propHandleOnRemoveFromEarmarked(e, assetType, propAssetId, propAssetIdType)
  }

  getStatusColor(status) {

    let statusClass
    switch (status) {
      case 'Arriving':
        statusClass = styles.statusAR;
        break;
      case 'Available':
        statusClass = styles.statusAV;
        break;
      case 'Deployed':
        statusClass = styles.statusDP;
        break;
      case 'Departed':
        statusClass = styles.statusD;
        break;
    }
    return statusClass
  }

  checkAmountExceeding(total, amount) {
    if (Number(amount) > Number(total))
      return (
        <div className={styles.errorPopUp}>
          Amount entered is larger than available.
        </div>
      )
  }

  render() {
    const {
      propAsset,
      propPrice,
      rawPrice,
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
    if (propCollateralType == COLLATERAL_EARMARKED) {

      statusDisplay = (<CollateralEarmarkStatusPopup propCollateralType={propCollateralType}
                                                     propAssetId={propAssetId}
                                                     propAssetIdType={propAssetIdType}
                                                     statusClass={statusClass}
                                                     propStatus={propStatus}
                                                     propIsDisplayAll={propIsDisplayAll}
                                                     listOfMarginCallName={listOfMarginCallName}
                                                     rawPrice={rawPrice}
                                                     checkAmountExceeding={this.checkAmountExceeding}/>)
    }else {
      statusDisplay = (<CollateralStatusPopup propCollateralType={propCollateralType}
                                              propAssetId={propAssetId}
                                              propAssetIdType={propAssetIdType}
                                              statusClass={statusClass}
                                              propStatus={propStatus}
                                              propIsDisplayAll={propIsDisplayAll}
                                              listOfMarginCallName={listOfMarginCallName}
                                              rawPrice={rawPrice}
                                              checkAmountExceeding={this.checkAmountExceeding}/>)
    }

    if (propIsDisplayAll) {
      return (
        <div className={styles.collateralRow}>
          <div className={styles.collateralCell} title={propAsset}>{maxLengthToEllipsis(propAsset, 17)}</div>
          <div className={styles.collateralCell}>{propPrice}</div>
          <div className={styles.collateralCell}>{propCcy}</div>
          <div className={styles.collateralCell}>{propDeliveryTime}</div>
          {statusDisplay}
          <div className={styles.collateralCell}>{propRating}</div>
          <div className={styles.collateralCell}>{propMaturityDate}</div>
          <div className={styles.collateralCell}>{propInternalCost}</div>
          <div className={styles.collateralCell}>{propOppCost}</div>
          <div className={styles.collateralCell}>{propIsin}</div>
          <div className={styles.collateralCell} title={propVenue}>{maxLengthToEllipsis(propVenue, 10)}</div>
          <div className={styles.collateralCell} title={propAcctId}>{maxLengthToEllipsis(propAcctId, 10)}</div>
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
