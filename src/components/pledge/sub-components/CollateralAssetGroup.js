import React, {PropTypes} from 'react'
import CollateralAssetContainer from '../../../containers/CollateralAssetContainer'
import {formatDate} from '../../../utils/formatDate'
import {numberWithCommas} from '../../../utils/numbersWithCommas'
import {formatPercentageOneDecimal} from '../../../utils/formatPercentageOneDecimal'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {timesWithIterator} from '../../../utils/immutableLoop'
import styles from '../Pledge.css'
import transitions from './CAGTransitions.css'


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
      return './images/common/minusbox.png'
    } else {
      return './images/common/plusbox.png'
    }
  }

  handlePlusMinus() {
    this.setState({
      isGroupExpanded: !this.state.isGroupExpanded
    })
  }

  getEmptyCellDomList(propIsDisplayAll) {
    // no of empty cells and list of divs
    let numEmptyCells, emptyCellList = []

    if (propIsDisplayAll) {
      numEmptyCells = 11
    } else {
      numEmptyCells = 6
    }
    timesWithIterator(numEmptyCells)(
      i => {
        let cellDiv = <div className={styles.collateralCell} key={i}></div>
        emptyCellList.push(...[cellDiv])
      }
    )
    return emptyCellList
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

    const emptyCellList = this.getEmptyCellDomList(propIsDisplayAll)

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

    return (
      <ReactCSSTransitionGroup component="div" className={styles.collateralRowGroup}
                               transitionName={transitions}
                               transitionEnterTimeout={500}
                               transitionLeaveTimeout={300}>

        <div className={styles.collateralRow + ' ' +
        (propCollateralType == 'Earmarked' ? styles.collateralExpandEarmarkedRow : styles.collateralExpandRow)}>
          <div className={styles.collateralCell}>
            <div>{propCollateralType} </div>
            <div onClick={this.handlePlusMinus}><img src={this.getPlusMinusImgURL(this.state.isGroupExpanded)}
                                                     alt=""/>
            </div>
          </div>

          {emptyCellList}

        </div>

        {componentList}

      </ReactCSSTransitionGroup>
    )

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