import React, {PropTypes} from 'react'
import CollateralAssetContainer from '../../../containers/CollateralAssetContainer'
import {formatDate} from '../../../utils/formatDate'
import {numberWithCommas} from '../../../utils/numbersWithCommas'
import {formatPercentageOneDecimal} from '../../../utils/formatPercentageOneDecimal'
import styles from '../Pledge.css'

export default class CollateralAssetGroup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isGroupExpanded: props.propIsExpanded
    }

    this.handlePlusMinus = this.handlePlusMinus.bind(this)
  }

  getPlusMinusImgURL(isExpanded) {
    if (isExpanded) {
      return './images/pledge/minusbox.png'
    } else {
      return './images/pledge/plusbox.png'
    }
  }

  handlePlusMinus() {
    this.setState({
      isGroupExpanded: !this.state.isGroupExpanded
    })
  }

  render() {
    const {
      propCollateralType,
      propCollateralAssetList,
      propIsDisplayAll,
      propHandleOnRemoveFromEarmarked
    } = this.props

    // []list of CollateralAsset components
    let componentList

    if (propCollateralAssetList && this.state.isGroupExpanded) {
      componentList = propCollateralAssetList.map((asset, index) => (
        <CollateralAssetContainer
          key={index}
          rowStyle={"tableRow"}
          propAsset={asset.assetName}
          propPrice={numberWithCommas(asset.price)}
          propCcy={asset.ccy}
          propDeliveryTime={asset.deliveryTime}
          propStatus={asset.status}
          propRating={asset.rating}
          propMaturityDate={formatDate(asset.maturityDate)}
          propInternalCost={formatPercentageOneDecimal(asset.internalCostPct)}
          propExternalCost={formatPercentageOneDecimal(asset.externalCostPct)}
          propOppCost={formatPercentageOneDecimal(asset.OppCostPct)}
          propIsin={asset.isin}
          propVenue={asset.venue}
          propAcctId={asset.acctId}
          propIsDisplayAll={propIsDisplayAll}
          propCollateralType={propCollateralType}
          propAssetId={asset.assetId}
          propAssetIdType={asset.assetIdType}
          propHandleOnRemoveFromEarmarked={propHandleOnRemoveFromEarmarked}
        />

      ))
    }


    if (propIsDisplayAll) {
      return (

        <div className={styles.collateralRowGroup}>

          <div className={styles.collateralRow + ' ' + styles.collateralExpandRow}>
            <div className={styles.collateralCell}>
              <div>{propCollateralType}</div>
              <div onClick={this.handlePlusMinus}><img src={this.getPlusMinusImgURL(this.state.isGroupExpanded)}
                                                       alt=""/>
              </div>
            </div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
          </div>

          {componentList}

        </div>
      )

    } else {
      return (

        <div className={styles.collateralRowGroup}>

          <div className={styles.collateralRow + ' ' + styles.collateralExpandRow}>
            <div className={styles.collateralCell}>
              <div>{propCollateralType}</div>
              <div onClick={this.handlePlusMinus}><img src={this.getPlusMinusImgURL(this.state.isGroupExpanded)}
                                                       alt=""/>
              </div>
            </div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
            <div className={styles.collateralCell}></div>
          </div>

          {componentList}

        </div>
      )

    }

  }
}

CollateralAssetGroup.PropTypes = {
  propCollateralType: PropTypes.string.isRequired,
  propIsExpanded: PropTypes.bool.isRequired,
  propCollateralAssetList: PropTypes.array
}

CollateralAssetGroup.defaultProps = {
  propCollateralAssetList: []
}