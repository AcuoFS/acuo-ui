import React from 'react';
import PropTypes from 'prop-types'
import moment from 'moment'

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

  dragstart_handler(e, propsData){
    let str = JSON.stringify(propsData)
    e.dataTransfer.setData('text/plain', str )
  }

  standardizeDate(date) {
    // console.log(date)
    if(date !== '-')
      return moment(date, "DD-MM-YY").format('YYYY-MM-DD')

    return date
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
    // console.log(this.standardizeDate(propMaturityDate))
    if (propIsDisplayAll) {
      return (
        <div className={styles.collateralRow} >
          <div className={styles.collateralCell} title={propAsset}>{maxLengthToEllipsis(propAsset, 17)}</div>
          <div className={styles.collateralCell} title={propPrice}>{propPrice}</div>
          <div className={styles.collateralCell} title={propCcy}>{propCcy}</div>
          <div className={styles.collateralCell} title={propDeliveryTime}>{propDeliveryTime}</div>
          {statusDisplay}
          <div className={styles.collateralCell} title={propRating}>{propRating}</div>
          <div className={styles.collateralCell} title={propMaturityDate}>{this.standardizeDate(propMaturityDate)}</div>
          <div className={styles.collateralCell} title={propInternalCost}>{propInternalCost}</div>
          <div className={styles.collateralCell} title={propOppCost}>{propOppCost}</div>
          <div className={styles.collateralCell} title={propIsin}>{propIsin}</div>
          <div className={styles.collateralCell} title={propVenue}>{maxLengthToEllipsis(propVenue, 10)}</div>
          <div className={styles.collateralCell} title={propAcctId}>{maxLengthToEllipsis(propAcctId, 10)}</div>
        </div>
      )
    }
    else {
     // #OW-324
      return (

        <div className={styles.collateralRow} draggable='true'
                                              onDragStart={ (e)=>{
                                                this.dragstart_handler(e, this.props)
                                               }}>
          <div className={styles.collateralCell} title={propAsset}>{maxLengthToEllipsis(propAsset, 17)}</div>
          <div className={styles.collateralCell} title={propPrice}>{propPrice}</div>
          <div className={styles.collateralCell} title={propCcy}>{propCcy}</div>
          <div className={styles.collateralCell} title={propDeliveryTime}>{propDeliveryTime}</div>
          {statusDisplay}
          <div className={styles.collateralCell} title={propRating}>{propRating}</div>
          <div className={styles.collateralCell} title={propMaturityDate}>{this.standardizeDate(propMaturityDate)}</div>
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
