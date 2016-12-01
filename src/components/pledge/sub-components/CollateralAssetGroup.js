import React, {PropTypes} from 'react'
import CollateralAsset from './CollateralAsset'
import {List} from 'immutable'
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

  // DD-MM-YY
  formatDate(dateStr) {
    let myDate = new Date(dateStr)
    let dd = myDate.getDate()
    let mm = myDate.getMonth() + 1
    let yyyy = myDate.getFullYear()
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    return (dd + '-' + mm + '-' + yyyy.toString().substring(2, 5))
  }

  render() {
    const {
      propCollateralType,
      propCollateralAssetList,
      propIsDisplayAll
    } = this.props

    // []list of CollateralAsset components
    let componentList

    if (propCollateralAssetList && this.state.isGroupExpanded) {
      componentList = propCollateralAssetList.map((asset, index) => (
        <CollateralAsset
          key={index}
          rowStyle={"tableRow"}
          propAsset={asset.assetName}
          propPrice={asset.price}
          propCcy={asset.ccy}
          propDeliveryTime={asset.deliveryTime}
          propStatus={asset.status}
          propRating={asset.rating}
          propMaturityDate={this.formatDate(asset.maturityDate)}
          propInternalCost={asset.internalCostPct}
          propExternalCost={asset.externalCostPct}
          propOppCost={asset.OppCostPct}
          propIsin={asset.isin}
          propVenue={asset.venue}
          propAcctId={asset.acctId}
          propIsDisplayAll={propIsDisplayAll}/>

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